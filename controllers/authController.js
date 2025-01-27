const { gerarToken } = require('../services/authService');
const bcrypt = require('bcrypt');
const User = require('../models/users/UserCadastrar');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.loginUser = async (req, res) => {
    const { email, senha } = req.body;

   try {
       const user = await User.findOne({email});

       if(!user){
           return res.status(404).send({message: "Credenciais inválidas."})
       }

       const senhaValida = bcrypt.compare(senha, user.senha)
       
       if(!senhaValida){
           return res.status(401).send({message: "Credenciais inválidas."})
       }

       const token = gerarToken(user.id)
       res.send({id: user.id, token,
       });

   } catch (error) {
       res.status(500).send(error.message);
   }    
};  