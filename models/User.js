const mongoose = require("mongoose");

// Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    }
});

// Mongoose Model
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;