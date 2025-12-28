const { INTERNAL_SERVER_ERROR } = require("../utils/httpErrors");

module.exports = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;
  if (statusCode === INTERNAL_SERVER_ERROR) {
    res.status(500).send({ message: "An internal server error occurred" });
  } else {
    res.status(statusCode).send({ message });
  }
};
