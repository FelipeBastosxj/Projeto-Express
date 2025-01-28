const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Projeto-Express", 
    version: "1.0.0", 
    description: "Projeto feito em Express com sistema de login e listagem de itens", 
  },
  servers: [
    {
      url: "http://localhost:3000", // URL base do servidor
      description: "Servidor local",
    },
  ],
};

const options = {
  definition: swaggerDefinition, 
  apis: ["./routes/*.js"], 
};

// Gera a especificação do Swagger
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

