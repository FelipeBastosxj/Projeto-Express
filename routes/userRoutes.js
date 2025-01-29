/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string  # Corrigido para string
 *           description: ID do usuário
 *         nome:
 *           type: string
 *           description: Nome do usuário
 *         idade:
 *           type: number
 *           description: Idade do usuário
 *         email:
 *           type: string
 *           description: E-mail do usuário
 *         senha:
 *           type: string
 *           description: Senha do usuário
 */

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
 *               idade:
 *                 type: number
 *               email:
 *                 type: string
 *                 description: E-mail do usuário
 *               senha:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Todos os campos são obrigatórios
 *       500:
 *         description: Erro ao criar usuário
 */

/**
 * @swagger
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
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro ao listar usuários
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obter informações de um usuário específico pelo ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Erro ao buscar usuário
 *   delete:
 *     summary: Excluir um usuário pelo ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Erro ao deletar usuário
 */

/**
 * @swagger
 * /api/users/update:
 *   put:
 *     summary: Atualiza a senha do usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senhaAtual:
 *                 type: string
 *               novaSenha:
 *                 type: string
 *                 description: Nova senha do usuário
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       401:
 *         description: Senha incorreta
 *       500:
 *         description: Erro ao atualizar senha
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