var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const cartController = require('../controllers/cartController');

router.get('/', cartController.show);

/************ ADD Items to cart_product ************/
/* GET - create */
router.get('/add/:id', cartController.create);
router.get('/plus/:id', cartController.plus);
router.get('/minus/:id', cartController.minus);

/************ CONFIRMAR compra  ************/
router.get('/confirm/:id', cartController.confirm);

/************ DELET ONE PRODUCT from cart_product ************/
/* DELETE - Delete from Data Base */
router.get('/remove/:id', cartController.remove);

module.exports = router;

