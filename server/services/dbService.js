const mysql = require('mysql2/promise')
const colors = require('colors');
const { asyncHandler, asyncDBHandler }= require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

const db = { conn: undefined, isConnected: false};

const connectDB = asyncHandler(async(req, res, next) => {
  db.conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'example_pass',
    database: 'AppDB',
    port: 3307
  })

  if (db.conn) db.isConnected = true;

  return next();
});

// query database example
// const [rows, fields] = await db.execute(
//   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Morty', 14]
// );

// database methods
const getAllRows = asyncDBHandler(async(table) => {
  const query = `SELECT * FROM ${table}`;

  const [results] = await db.conn.execute(query);

  return results;
});

const getRowById = asyncDBHandler( async(table, id) =>{
  const query = `SELECT * FROM ${table} WHERE id = ${id}`;

  const [results] = await db.conn.execute(query);
  return results;
});

const addRow = asyncDBHandler(async(table, body) => {
  const keys = Object.keys(body);

  console.log('body:', body);
  
  let params = "";
  keys.map((key, index) => {
    if (index == 0)
      params += `${key}`
    else
      params += `, ${key}`
  });

  let valuesStr = "";
  keys.map((key, index) => {
    if (index == 0)
      valuesStr += `?`
    else
      valuesStr += `,?`
  });

  let paramValues = keys.map(key => body[key]);

  // // TODO add validation

  // // Setup query
  const query = `
    INSERT INTO ${table}(${params}) 
    VALUES (${valuesStr})
  `;

  const [results] = await db.conn.execute(query, paramValues);
  
  return {id: results.insertId};
  
});

const updateRowById = asyncDBHandler(async(table, id, body) => {
  const columns = Object.entries(body);

  let columnsStr = "";

  columns.map((column, index) => {
    columnsStr += `${column[0]}= "${column[1]}"`;
    
    // add komma to any but the last column 
    if (columns.length > 1){
      if (index < columns.length -1)
        columnsStr += ',';
    }
  });

  // Setup query
  const query = `UPDATE ${table} SET ${columnsStr} WHERE id = ?`;

  const [results] = await db.conn.execute(query, [id]);

  return getRowById(table, id);
});

const deleteRowById = asyncDBHandler(async(table, id) => {
  // Setup query
  const query = `DELETE FROM ${table} WHERE id = ?`;

  const results = await db.conn.execute(query, [id]);

  return {id: id};
});

module.exports = {
  getAllRows,
  getRowById,
  addRow,
  updateRowById,
  deleteRowById,
  connectDB,
  db
};
