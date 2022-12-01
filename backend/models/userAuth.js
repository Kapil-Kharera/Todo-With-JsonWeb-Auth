const mongoose = require('mongoose');

const userAuthSchema = new mongoose.Schema({
    firstname: {
        type: String,
        default: null,
        maxLength: [20, "Max characters allowed are 20"],
        required: true
    },

    lastname: {
        type: String,
        default: null,
        maxLength: [20, "Max characters allowed are 20"],
    },

    email: {
        type: String,
        default: null,
        required: true,
        unique: true
    },

    password: {
        type: String,
        default: null,
        minLength: [6, "Your password have atleast 6 characters"],
        required: true
    },

    token: {
        type: String,
    }
});

module.exports = mongoose.model("UserAuth", userAuthSchema);