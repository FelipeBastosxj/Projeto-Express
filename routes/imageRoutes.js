/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Gerenciamento de imagens
 */

/**
 * @swagger
 * /api/images/create:
 *   post:
 *     summary: Criar uma nova imagem
 *     tags: [Images]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título da imagem
 *               descrição:
 *                 type: string
 *               imagemBase64:
 *                 type: string
 *                 
 *     responses:
 *       201:
 *         description: Imagem adicionada com sucesso
 *       400:
 *         description: Todos os campos são obrigatórios
 *       500:
 *         description: Erro ao salvar a imagem
 *
 * /api/images/list:
 *   get:
 *     summary: Listar todas as imagens
 *     tags: [Images]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de imagens retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   url:
 *                     type: string
 *       500:
 *         description: Erro ao listar imagens
 */

const express = require('express');
const imageController = require('../controllers/imageController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/create', verifyToken, imageController.createImage);
router.get('/list', verifyToken, imageController.listImages);

module.exports = router;