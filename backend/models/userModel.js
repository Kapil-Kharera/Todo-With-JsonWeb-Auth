const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name field is required."],
        trim: true,
        maxLength: [25, "Characters of your Name is allowed upto 25"]
    },
    email: {
        type: String,
        required: [true, "Email field is required"],
        unique: true
    }
});

module.exports = mongoose.model("User", userSchema);