const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    nome: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    idade: { type: Number},
    senha: { type: String, required: true, unique: true}
});

const UserCadastrar = mongoose.model('UserCadastrar', userSchema);

module.exports = UserCadastrar;