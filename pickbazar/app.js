const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE
const session = require('express-session');// Para usar Session
const rememberMiddleware = require('./middlewares/rememberMiddleware');
const db = require('./database/models');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({ secret: 'PickbazarSecret' }));
app.use(rememberMiddleware);

app.use(function (req, res, next) {
  res.locals.userFound = req.session.userFound;
  next()
})

app.use(function (req, res, next) {
  
  db.Category.findAll(
    )
    .then(function (category) {
<<<<<<< HEAD
      return category
    })
    .then(function(global){
      res.locals.cat = global
    })
    next()
})

app.use(function (req, res, next) {
  
  db.Subcategory.findAll(
    {include: [{ association: "Category" }]
    })
    .then(function (subCategory) {
      return subCategory
    })
    .then(function(send){
      res.locals.subCat = send
    })
    next()
})
=======
      res.locals.cat = category
      next()
    })
  })
>>>>>>> b46e1b3284b608d3677e6f884961cb8ba8bc3ac7

app.use(function (req, res, next) {
  
  db.Subcategory.findAll(
    {include: [{ association: "Category" }]
    })
    .then(function (subCategory) {
      res.locals.subCat = subCategory
      next()
    })
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
