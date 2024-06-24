class ErrorResponse extends Error {
  constructor(message, statusCode, query = '') {
    super(message);
    this.statusCode = statusCode;
    this.query = query;
  }
}

module.exports = ErrorResponse;