const {
  getAllRows,
  getRowById,
  addRow,
  updateRowById,
  deleteRowById
} = require('../services/dbService');
const { asyncHandler } = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// Specify table to reference in database
const table = "users";

// @desc    Get all users
// @route   GET /
// @access  Public
exports.getUsers = asyncHandler( async (req, res, next) => {
  let data = await getAllRows(table);
  
  if(!data) {
    return next(new ErrorResponse('error getting all users from database'.red, 503));
  }

  res.status(200).json({
    success: true,
    data: data
  });  
});

// @desc    Get single user by id
// @route   GET /:id
// @access  Public
exports.getUserById = asyncHandler( async (req, res, next) => {
  let data = await getRowById(table, req.params.id);

  if (data.length === 0) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  console.log(data);
  
  res.status(200).json({
    success: true,
    data: data
  });
});

// @desc    Create new user
// @route   POST /
// @access  Private
exports.addUser = asyncHandler( async (req, res, next) => {

  const data = await addRow(table, req.body);
  
  // check if there was an error adding to the database
  if (!data) {
    console.error(data.message.red);
    return next(new ErrorResponse('Error adding user to the database', 404));
  }
  
  const newUser = {id: data.id, ...req.body };

  console.log(newUser);
  
  res.status(200).json({
    success: true,
    data: newUser
  });
});

// @desc    Update user by id
// @route   PUT /:id
// @access  Private
exports.updateUserById = asyncHandler( async (req, res, next) => {
  const user = await getRowById(table, req.params.id);
  
  if (user.length == 0){
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 400));
  }

  const data = await updateRowById(table, req.params.id, req.body);
  
  // check if there was an error adding to the database
  if (!data) {
    return next(new ErrorResponse('Error updating user in the database', 404));
  }

  console.log('updatedUser:', data);
  
  res.status(200).json({
    success: true,
    data: data
  });
});

// @desc    Delete user by id
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteUserById = asyncHandler( async (req, res, next) => {
  const user = await getRowById(table, req.params.id);

  if (user.length == 0){
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 400));
  }

  const data = await deleteRowById(table, req.params.id);
  
  // check if there was an error adding to the database
  if (!data) {
    console.log(data.red);
    return next(new ErrorResponse('Error deleting user from the database', 404));
  }

  const deletedUser = user[0];
  
  console.log('deletedUser:', deletedUser );

  res.status(200).json({
    success: true,
    message: `Deleted user ${deletedUser.first_name} with id ${data.id}`
  });
});

