// ************ Require's ************
var express = require('express');
var router = express.Router();
const path = require('path');
const { check, validationResult, body } = require('express-validator');
const multer = require('multer');
const usersController = require('../controllers/usersController');
const fs = require('fs');
const bcrypt = require('bcrypt');
const userMiddlewares = require('../middlewares/userMiddlewares')

const usersDB = path.join(__dirname, '../data/usersDB.json');
let users = JSON.parse(fs.readFileSync(usersDB, 'utf-8'));

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
router.get('/login/', userMiddlewares.gest, usersController.login);

/* POST - Process login form */
router.post('/login/', [
    check('email').isEmail().withMessage('Email invalido'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
], usersController.processLogin);

/* GET - User profile */
router.get('/profile/', usersController.profile);

/************ CREATE ONE USER ************/
/* GET - Form to create */
router.get('/register/', usersController.register);

/* POST - Store in Data Base */
router.post('/register/', upload.any(), [
    check('first_name').isLength({ min: 2 }).withMessage('El nombre debe tener mas de 2 caracteres'),
    check('last_name').isLength({ min: 2 }).withMessage('El apellido debe tener mas de 2 caracteres'),
    check('email').isEmail().withMessage('Debe ingresar un Email valido'),
    check('phone').isInt().withMessage('Debe ingresar solo numeros'),
    check('phone').isLength({ min: 8, max: 10}).withMessage('Máximo 10 dígitos y debe incluir el código de area'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener mas de 6 caracteres'),
    body('email').custom(function (value) {
        for (let i=0; i<users.length; i++) {
            if (users[i].email == value) {
                return false;
            }
        }
        return true;
    }).withMessage('Usuario existente'),
    body('passwordConfirm').custom(function (value, { req }) {
        let pass = req.body.password;
        console.log(pass);
        if (pass != value) {
            return false
        }
        return true;
    }).withMessage('Las contraseñas no coinciden')
], usersController.store);

/************ EDIT ONE USER ************/
/* GET - Form to edit */
router.get('/edit', usersController.edit);
/* PUT - Update in Data Base */
router.put('/edit', upload.any(), [
    check('first_name').isLength({ min: 2 }).withMessage('El nombre debe tener mas de 2 caracteres'),
    check('last_name').isLength({ min: 2 }).withMessage('El apellido debe tener mas de 2 caracteres'),
    check('email').isEmail().withMessage('Debe ingresar un Email valido'),
    check('phone').isInt().withMessage('Debe ingresar solo numeros'),
    check('phone').isLength({ min: 8 }).withMessage('El telefono debe tener el codigo de area'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener mas de 6 caracteres'),
    body('email').custom(function (value) {
        for (let i=0; i<users.length; i++) {
            if (users[i].email == value) {
                return false;
            }
        }
        return true;
    }).withMessage('Usuario existente'),
    body('passwordConfirm').custom(function (value, { req }) {
        let pass = req.body.password;
        console.log(pass);
        if (pass != value) {
            return false
        }
        return true;
    }).withMessage('Las contraseñas no coinciden')
], usersController.update);

/************ DELET ONE PRODUCT ************/
/* DELETE - Delete from Data Base */
router.delete('/delete/:userId', usersController.destroy);

module.exports = router;