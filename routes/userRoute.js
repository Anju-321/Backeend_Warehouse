const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController=require('../controllers/authController')

router.post('', authController.registerUser);
router.post('/login', authController.userLogin);
router.put('/:userId',userController.updateUser);
router.get('',userController.getuser)
router.get('/:userId',userController.getSingleuser)
module.exports = router;