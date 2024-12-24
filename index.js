const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

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

app.listen(3000, () => 
    console.log('Servidor rodando em http//localhost:3000')
    );