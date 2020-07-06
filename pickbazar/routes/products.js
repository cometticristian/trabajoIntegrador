// ************ Require's ************
var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const userMiddlewares = require('../middlewares/userMiddlewares')
const productsController = require('../controllers/productsController');

/************ MULTER STORAGE ************/
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/products')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage: storage });

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
router.get('/create/', userMiddlewares.admin, productsController.create);

/* POST - Store in Data Base */
router.post('/create/', upload.any(), productsController.store);

/************ EDIT ONE PRODUCT ************/
/* GET - Form to edit */
router.get('/edit/:productId', userMiddlewares.admin, productsController.edit);
/* PUT - Update in Data Base */
router.put('/edit/:productId', upload.any(), productsController.update);

/************ DELET ONE PRODUCT ************/
/* DELETE - Delete from Data Base */
router.delete('/delete/:productId', userMiddlewares.admin, productsController.destroy);

module.exports = router;