/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realizar login e obter um token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-mail do usuário
 *               senha:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT gerado
 *       401:
 *         description: Credenciais inválidas
 */

const express = require('express');
const authController = require('../controllers/authController.js');

const router = express.Router();

router.post('/login', authController.loginUser);

module.exports = router;