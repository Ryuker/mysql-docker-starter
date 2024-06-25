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

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;

