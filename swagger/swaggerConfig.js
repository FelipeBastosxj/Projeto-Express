const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Projeto-Express", 
    version: "1.0.0",            
    description: "Projeto feito em express com um sistema de login e listagem de itens",
  },
  servers: [
    {
      url: "http://localhost:3000", // URL base do servidor local
      description: "Servidor local",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Especifica onde estão as rotas
};

module.exports = swaggerJSDoc(options);
