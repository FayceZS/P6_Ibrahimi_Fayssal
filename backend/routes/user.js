const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');            //On appelle les middlewares propres aux users

router.post("/signup",userCtrl.signup);             //On appelle les fonctions appropriées à nos routes
router.post("/login",userCtrl.login);

module.exports = router;