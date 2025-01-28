const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDatabase = require('./db');

const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');
const authRoutes = require('./routes/authRoutes');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swaggerConfig");

const app = express();
connectDatabase()

app.use(morgan(':method :url - Status :status - Tempo: :response-time ms'));
app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}));
app.use(bodyParser.json({limit: '10mb' }));
app.use(cors());

app.use('/users', userRoutes);
app.use('/image', imageRoutes);
app.use('/auth', authRoutes);
 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => console.log('Servidor rodando em http//localhost:3000'));
