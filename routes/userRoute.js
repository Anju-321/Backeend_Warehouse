const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController=require('../controllers/authController')

router.post('/register', authController.registerUser);
router.post('/login', authController.userLogin);
router.put('/updateuser/:userId',userController.updateUser);
router.get('/getuser',userController.getuser)
router.get('/getuser/:userId',userController.getSingleuser)
module.exports = router;