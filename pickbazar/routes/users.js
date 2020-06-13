// ************ Require's ************
var express = require('express');
var router = express.Router();
const path = require ('path');
const { check, validationResult, body } = require('express-validator');
const multer = require('multer');
const usersController = require('../controllers/usersController');

/************ MULTER STORAGE ************/
var storage = multer.diskStorage({
      destination: (req, file, cb) => {
         cb(null, 'public/images/users')
      },
      filename: (req, file, cb) => {
         cb(null, file.fieldname + ' ' + Date.now() + path.extname(file.originalname))
      }
    })
    var upload = multer({ storage: storage });

/************ LOGIN USER ************/
/* GET - Form to login */
router.get('/login/', usersController.login);

/* POST - Process login form */
router.post('/login/', [
    check('email').isEmail().withMessage('Email invalido'),
    check('password').isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres'),
], usersController.processLogin);

/* GET - User profile */
router.get('/profile/', usersController.profile);

/************ CREATE ONE USER ************/
/* GET - Form to create */
router.get('/register/', usersController.register);

/* POST - Store in Data Base */
router.post('/create/', upload.any(), usersController.store);

/************ EDIT ONE USER ************/
/* GET - Form to edit */
router.get('/edit/:userId', usersController.edit);
/* PUT - Update in Data Base */
router.put('/edit/:userId', upload.any(),usersController.update);

/************ DELET ONE PRODUCT ************/
/* DELETE - Delete from Data Base */
router.delete('/delete/:userId', usersController.destroy);

module.exports = router;