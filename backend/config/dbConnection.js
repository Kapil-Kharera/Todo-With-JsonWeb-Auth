const mongoose = require('mongoose');

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then((con) => {
            console.log(`DB connected to : ${con.connection.host}`);
        })
        .catch((error) => {
            console.log(error.message);
            process.exit(1);
        })
}

module.exports = dbConnection;