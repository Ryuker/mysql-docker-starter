const {
  db
} = require('../services/dbService');
const { asyncHandler } = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');


// @desc    Get all users
// @route   GET /
// @access  Public
exports.getRoot = asyncHandler( async (req, res, next) => {
  if (db.isConnected) {
    res.status(200).send(`<h1>Server running with database connected</h1>`);
  }
});
