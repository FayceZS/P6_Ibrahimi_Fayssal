const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const sauceCtrl = require('../controllers/sauce');

router.get('/', sauceCtrl.getAllSauces);
router.post('/',auth, multer, sauceCtrl.createSauce);
router.post('/:id/like',auth,sauceCtrl.likeCtrl);
router.get('/:id', sauceCtrl.getOneSauce);
router.put('/:id',auth,multer, sauceCtrl.modifySauce);
router.delete('/:id',auth, sauceCtrl.deleteSauce);

module.exports = router;

