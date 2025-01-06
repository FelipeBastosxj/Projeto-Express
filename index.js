const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/users/UserCadastrar.js');

const app = express();

app.use(express.json());
app.use(morgan(':method :url - Status :status - Tempo: :response-time ms'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const data = [];

app.get('/', (req, res) => {
    return res.json({ data });
});

app.post('/add', (req, res) => {
    const result = req.body;

    if (result) {
        return res.status(400).json({ error: 'Dados não fornecidos' });
        };
      

    data.push(result);
    return res.status(200).json({ result });
});

app.post('/users', async (req, res) => {
    try {
        const { nome, email, idade, senha } = req.body;

        const newUser = new User({ nome, email, idade, senha});
        await newUser.save();

        res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser});
    }  catch (error) {
        res.status(400).json({ error: 'Erro ao criar usuário', details: error.message});
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários', details: error.message});
    }
})


app.listen(8000, () => 
    console.log('Servidor rodando em http://localhost:8000')
    );