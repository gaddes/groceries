var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

// Use ES6 promises - is this required?
mongoose.Promise = global.Promise;

// Define endpoints
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

// FIXME: remove for production?
// Add cors support
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Point the production version of our app to the static files
 * React created during the build process -> index.html
 *
 * TODO: This should be commented out for DEVELOPMENT
 * TODO: And un-commented for PRODUCTION
 */
app.use(express.static(path.join(__dirname, '/client/build')));

// Handles any requests that don't match the ones above
// app.get('/*', (req,res) =>{
//   res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

/**
 * Handle HTTP requests
 */

app.get('/items', itemsRouter);
app.post('/items', itemsRouter);
app.delete('/items', itemsRouter);

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

  /**
   * Error is returned in JSON format because the default
   * error page is a Jade template, and because we're using React,
   * all Jade stuff has been removed from this project
   */
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
