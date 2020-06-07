// ************ Require's ************
var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController');

/* GET - User profile */
router.get('/profile/:userId/', usersController.detail);

/************ CREATE ONE USER ************/
/* GET - Form to create */
router.get('/create/', usersController.create);

/* POST - Store in Data Base */
router.post('/create/', usersController.store);

/************ EDIT ONE USER ************/
/* GET - Form to edit */
router.get('/edit/:userId', usersController.edit);
/* PUT - Update in Data Base */
router.put('/edit/:userId', usersController.update);

/************ DELET ONE PRODUCT ************/
/* DELETE - Delete from Data Base */
router.delete('/delete/:userId', usersController.destroy);

module.exports = router;