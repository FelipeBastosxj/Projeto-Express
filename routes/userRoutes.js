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