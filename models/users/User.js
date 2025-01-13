const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },

    idade: {
        type: Number,
        riquired: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model("User", UserSchema);