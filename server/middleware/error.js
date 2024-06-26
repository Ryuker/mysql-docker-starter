const colors = require('colors');
const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {

  let error = { ...err };
  
  error.message = err.message;

  console.error('error info'.red, error);

  if (error.code){
    error.message = 'Server error accessing database';
    error.statusCode = 503;
  }

  if(req.url == '/')
    if (error.code ==='ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.log('Database not found');
      res.status(error.statusCode).send(`<h1>Server running without the database connected</h1>`);
      return next();
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;

