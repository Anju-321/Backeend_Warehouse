const express = require('express');
const router = express.Router();
// const userController = require('../controllers/userController');
const authController=require('../controllers/authController')

router.post('/register', authController.registerUser);
router.post('/login', authController.userLogin)

module.exports = router;