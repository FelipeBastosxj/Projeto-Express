const express = require('express');
const userController = require('../controllers/userController.js');
const { verifyToken } = require('../middlewares/auth.js');

const router = express.Router();
 
router.post('/create', userController.createUser);
router.get('/list', verifyToken, userController.listUsers);
router.put('/update', verifyToken, userController.updatePassword);

module.exports = router;