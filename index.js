const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDatabase = require('./db');
const User = require('./models/users/UserCadastrar');
const bcrypt = require('bcrypt');

const UserList = require('./models/users/user.js');
const Image = require('./models/itens/Imagem.js');

const app = express();

connectDatabase()

app.use(morgan(':method :url - Status :status - Tempo: :response-time ms'));
app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}));
app.use(bodyParser.json({limit: '10mb' }));
app.use(cors());

app.post('/users', async (req, res) => {
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
        });


app.post('/users/login', async (req, res) => {
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

        res.send("Login ok");

    } catch (error) {
        res.status(500).send(error.message);
    }
    
    
});

// Endpoint GET para listar
app.get('/usuarios', async (req, res) =>{
    try {
        const usuarios = await UserList.find({},'nome idade email');
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar usuários.'});
    }
});

// Endpoint para cadastrar imagem
app.post('/imagens', async (req, res) =>{
    const {
        titulo, descricao, imagemBase64 
    } = req.body;
    if (!titulo || !descricao || !imagemBase64) {
        return res.status(400).json({erro:'Todos os campos são obrigatórios'});
    }

    try{
        const novaImagem = new Image({titulo, descricao, imagemBase64});
        await novaImagem.save();
        res.status(201).json({ message: 'Imagem adicionada com sucesso!'});
    } catch (err) {
        res.status(500).json({ error: 'Erro ao salvar a imagem.'});
    }
});
// Endpoint para listar imagens
app.get('/imagens', async (req, res) => {
    try {
        const imagens = await Image.find({}, 'titulo descricao imagemBase64');
        res.status(200).json(imagens);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar imagens.'});
    }
});
    
app.listen(3000, () => console.log('Servidor rodando em http//localhost:3000'));
