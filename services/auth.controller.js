require('dotenv').config();
const jwt = require('jsonwebtoken');

const gerarToken = (id) => jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn: 86400});

module.exports = { gerarToken };