var express = require('express');
var router = express.Router();

/* GET cart listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});

module.exports = router;
