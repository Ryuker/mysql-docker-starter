const colors = require('colors');
const express = require('express');

const app = express();

///////////
/// run the server
server = app.listen(
  5000,
  (() => {
    console.log('Server running on port 5000');
  })
);