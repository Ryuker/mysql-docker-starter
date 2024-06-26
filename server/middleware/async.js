const asyncHandler = fn => (req, res, next) => 
  Promise.resolve(fn(req, res, next)).catch(next);

const asyncDBHandler = fn => (table, req, res, next) => 
  Promise.resolve(fn(table, req, res, next)).catch(next);

module.exports = { asyncHandler, asyncDBHandler};