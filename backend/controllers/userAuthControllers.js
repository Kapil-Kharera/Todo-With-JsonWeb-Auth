const userAuth = require('../models/userAuth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        //collect all information
        const {firstname, lastname, email, password } = req.body;

        //fields are not present
        if (!(firstname && password && lastname && email)) {
            res.status(401).send("All fields are required")
        }

        //check if user exists or not in db
        const existingUser = await userAuth.findOne({email});

        if (existingUser) {
            res.status(401).send("User already found in database");
        }

        //encrypt the password
        const encryptPassword = await bcrypt.hash(password, 10);

        //creating user in db
        const user = await userAuth.create({
            firstname,
            lastname,
            email,
            password: encryptPassword
        });

        //creating token and send it to user
        const token = jwt.sign({id: user._id}, 'shhhhh' , {expiresIn: '2h'});

        user.token = token;
        user.password = undefined;


        res.status(200).json({
            success: true,
            message: "User registered successfully",
            user
        })


    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "User is not registered successfully"
        });
    }
}

exports.login = async (req, res) => {
    try {
        //collect information
        const { email, password } = req.body;

        //validate 
        if (!(email && password)) {
            res.status(401).send("Email and password is required");
        }

        //check user in db
        const userExists = await userAuth.findOne({email});

        if (!userExists) {
            res.status(401).send("User already exists in database");
        }

        //match the password 
        if (userExists && (await bcrypt.compare(password, userExists.password))) {
            const token = jwt.sign({
                id: userExists._id,
                email
            }, 'shhhhh' , {expiresIn: '2h'});

            userExists.password = undefined;
            userExists.token = token;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            res.status(200).cookie("token", token, options).json({
                success: true,
                token,
                userExists,
                message: "Password is matched"
            })
        }

        res.status(400).send("Email or password is incorrect");
    } catch (error) {
        console.log("Error in login : ", error);
        res.status(401).json({
            success: false,
            message: "Error in login of user"
        })
    }
}

exports.dashboard = async (req, res) => {
    res.status(200).send("Welcome to dashboard");
}