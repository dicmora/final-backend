class ConflictError extends Error {
  constructor(message = "Conflit") {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
