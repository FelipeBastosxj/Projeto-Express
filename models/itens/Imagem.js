const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    titulo: {
        type: String,
        riquired: true,
    },

    descricao: {
        type: String,
        riquired: true,
    },

    imagemBase64: {
        type: String,
        riquired: true,
    },
}, { timestamps: true});

module.exports = mongoose.model("Image", ImageSchema);