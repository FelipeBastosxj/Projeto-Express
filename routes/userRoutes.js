/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Criar um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do usuário
 *               email:
 *                 type: string
 *                 description: E-mail do usuário
 *               senha:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *
 * /api/users/list:
 *   get:
 *     summary: Listar todos os usuários
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   email:
 *                     type: string
 *
 * /api/users/update:
 *   put:
 *     summary: Atualizar a senha do usuário
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
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
 *               novaSenha:
 *                 type: string
 *                 description: Nova senha do usuário
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 */

const express = require('express');
const userController = require('../controllers/userController.js');
const { verifyToken } = require('../middlewares/auth.js');

const router = express.Router();
 
router.post('/create', userController.createUser);
router.get('/list', verifyToken, userController.listUsers);
router.get('/:id', verifyToken, userController.listUsersId);
router.put('/update', verifyToken, userController.updatePassword);
router.delete('/:id', verifyToken, userController.deleteUserById);

module.exports = router;