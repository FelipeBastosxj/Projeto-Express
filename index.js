const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDatabase = require('./db');
const User = require('./models/users/UserCadastrar');
const bcrypt = require('bcrypt');

const app = express();

connectDatabase()

app.use(morgan(':method :url - Status :status - Tempo: :response-time ms'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
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
    
app.listen(3000, () => console.log('Servidor rodando em http//localhost:3000'));
