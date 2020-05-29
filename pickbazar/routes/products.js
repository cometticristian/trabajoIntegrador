// ************ Require's ************
var express = require('express');
var router = express.Router();

const productsController = require('../controllers/productsController');

/* GET - All products */
router.get('/', productsController.root);

/* GET - Product category */
router.get('/category/:productCategory/', productsController.category);

/* GET - Product subcategory */
router.get('/subCategory/:productSubCategory/', productsController.subCategory);

/* GET - Product detail */
router.get('/detail/:productId/', productsController.detail);

/************ CREATE ONE PRODUCT ************/
/* GET - Form to create */
router.get('/create/', productsController.create);

/* POST - Store in Data Base */
router.post('/create/', productsController.store);

/************ EDIT ONE PRODUCT ************/
/* GET - Form to edit */
router.get('/edit/:productId', productsController.edit);
/* PUT - Update in Data Base */
router.put('/edit/:productId', productsController.update);

/************ DELET ONE PRODUCT ************/
/* DELETE - Delete from Data Base */
router.delete('/delete/:productId', productsController.destroy);

module.exports = router;