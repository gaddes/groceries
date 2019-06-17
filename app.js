var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

// Use ES6 promises - is this required?
mongoose.Promise = global.Promise;

var indexRouter = require('./routes/index');
var itemsRouter = require('./routes/items');

var app = express();

// Import environment variables from .env file
require('dotenv').config({ path: '.env' });

// Connect to MongoDB
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

// Check connection to MongoDB and log status
let db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB successfully'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/**
 * All this stuff below auto-generated by Express
 */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// TODO: remove for production?
// Add cors support
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/items', itemsRouter);
// FIXME: does this fix the 'post' issue?
app.post('/', itemsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
