const User = require('../models/userModel');

//business logic
exports.home = (req, res) => {
    res.status(200).send("Hello from Home Route");
}

exports.createUser = async (req, res) => {
    try {
        //collecting information
        const { name, email } = req.body;

        //if field is not empty
        if (!(name || email)) {
            throw new Error("Name and Email is required");
        }

        //if user exists already
        const userExists = await User.findOne({email});

        //error for exists users
        if (userExists) {
            throw new Error("User is already exists in Database");
        }

        //inserting user into database
        const user = await User.create({name, email});

        //response after successfully user created
        res.status(201).json({
            success: true,
            message: "User created successfully",
        });
    } catch (error) {
        console.log(error);
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({});

        res.status(200).json({
            success: true,
            message: "All users are fetched successfully",
            users
        })
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            error: error.message
        })
    }
}

exports.editUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        user
    })
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}