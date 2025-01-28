const User = require('../models/users/UserCadastrar.js');
const bcrypt = require('bcrypt');
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
        const usuarios = await User.find({},'nome idade email');
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar usuários.'});
    }
};

exports.deleteUserById = async (req, res) => {
    const{ id } = req.params;

    try {
        const userdeleted = await User.findByIdAndDelete(id);

        if (!userdeleted) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado'});
        }
        res.status(200).json({ mensagem: 'Usuário deletado com sucesso'});
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ mensagem: 'ID inválido'})
        }
        res.status(500).json({ mensagem: 'Erro ao deletar usuário', erro: error.message});
    }
}








exports.listUsersId = async (req, res) =>{
    const { id } = req.params;

    try{
        const usersid = await User.findById(id,'nome idade email');

        if (!usersid) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado'});
        }

        res.status(200).json(usersid);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ mensagem: 'ID inválido'});
        }
        res.status(500).json({ mensagem: 'Erro ao buscar usuário', erro: error.message})
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