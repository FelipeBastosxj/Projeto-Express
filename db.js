require('dotenv').config();

const mongoose = require('mongoose');

const connectDatabase = () => {
  console.log("Conectando ao Banco de Dados...");

  mongoose.connect( process.env.MONGO_URI )
  .then(() => console.log("MongoDB Atlas conectado!"))
  .catch((error) => console.log(error));
}

module.exports = connectDatabase;