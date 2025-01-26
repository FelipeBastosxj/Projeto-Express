const User = require('../models/users/UserCadastrar.js');
const bcrypt = require('bcrypt');''
const UserList = require('../models/users/User.js');

exports.createUser = async (req, res) => {
    try {
        const { nome, idade, email, senha } = req.body;
        if (!nome || !idade || !email || !senha) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }
            
        const newUser = new User({ nome, idade, email, senha });
        await newUser.save();

        res.status(201).json({ message: "Usuário criado com sucesso", user: newUser });
         } catch(error) {
            console.error("Erro ao criar usuário:", error);
            res.status(500).json({error: "Erro ao criar usuário."});
         }
}; 

exports.listUsers = async (req, res) =>{
    try {
        const usuarios = await UserList.find({},'nome idade email');
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar usuários.'});
    }
};

exports.updatePassword = async (req, res) => {
    const { email, senhaAtual, novaSenha } = req.body;

    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).send({message: "Usuário não encontrado."});
        }

        const senhaValida = bcrypt.compare(senhaAtual, user.senha);

        if(!senhaValida){
            return res.status(401).send({message: "Senha incorreta."});
        }

        const novaSenhaHash = await bcrypt.hash(novaSenha, 10);

        user.senha = novaSenhaHash;
        await user.save()

        res.send({message: "Senha atualizada com sucesso!"})
    } catch (error) {
        res.status(500).send({message: "Erro ao atualizar senha.", error: error.message })
    }
};