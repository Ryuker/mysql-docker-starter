const express = require('express');

const {
  getRoot
} = require('../controllers/root.js');

const router = express.Router();

// All Users
router
  .route('/')
  .get(getRoot)

module.exports = router;