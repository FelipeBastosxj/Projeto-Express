const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    nome: { 
        type: String, 
        required: true,
    },
    email: { 
        type: String,
        required: true,
        unique: true, 
        lowercase: true,
    },
    idade: { 
        type: Number,
    },
    senha: { 
        type: String, 
        required: true, 
        unique: true, 
    },
});

  userSchema.pre("save", async function (next) {
    this.senha = await bcrypt.hash(this.senha, 10);
    next();
  })
    
const UserCadastrar = mongoose.model('UserCadastrar', userSchema);

module.exports = UserCadastrar;