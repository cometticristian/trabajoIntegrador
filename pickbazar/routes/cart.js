var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const cartController = require('../controllers/cartController');


/* GET cart listing. */
//router.get('/', function(req, res, next) {
//  res.render('cart');
//});

router.get('/', cartController.show);

/************ ADD Items to CART ************/
/* GET - Form to create */
router.get('/add/:id', cartController.add);

/* POST - Store in Data Base */
/*router.post('/create/', productsController.store);*/

/************ EDIT ONE PRODUCT from cart ************/
/* GET - Form to edit */
router.get('/edit/:id', cartController.edit);
/* PUT - Update in Data Base */
//router.put('/edit/:id', cartController.update);*/

/************ DELET ONE PRODUCT from cart ************/
/* DELETE - Delete from Data Base */
router.get('/remove/:id', cartController.remove);

module.exports = router;

