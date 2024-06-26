const colors = require('colors');
const express = require('express');

// middleware import
const errorHandler = require('./middleware/error');
const asyncHandler = require('./middleware/async');
const { connectDB } = require('./services/dbService.js');

// utils
const ErrorResponse = require('./utils/errorResponse');

const app = express();

// Route files
const root = require('./routes/root')
const users = require('./routes/users');

//////////////
// db stuff
app.use(connectDB);

/////////////////
/// Middleware //

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount Routers
app.use('/', root)
app.use('/api/users', users);

// - Error Handler
app.use(errorHandler);

///////////
/// run the server
server = app.listen(
  5000,
  (() => {
    console.log('Server running on port 5000');
  })
);
