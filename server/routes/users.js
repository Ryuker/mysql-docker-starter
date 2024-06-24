const express = require('express');

const {
  getUsers,
  getUserById,
  addUser,
  updateUserById,
  deleteUserById
} = require('../controllers/users.js');
const { db } = require('../services/dbService.js');

const router = express.Router();
router.use(db);

// All Users
router
  .route('/')
  .get(getUsers)
  .post(addUser)

// Single user
router
  .route('/:id')
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById)

module.exports = router;