const { INTERNAL_SERVER_ERROR } = require("http-status-codes");

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (statusCode === 500) {
    res.status(500).send({ message: "An internal server error occurred" });
  } else {
    res.status(statusCode).send({ message });
  }
  next();
};
