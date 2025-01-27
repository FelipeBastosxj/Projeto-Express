const express = require('express');
const imageController = require('../controllers/imageController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/create', verifyToken, imageController.createImage);
router.get('/list', verifyToken, imageController.listImages);

module.exports = router;