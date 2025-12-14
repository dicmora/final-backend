require("dotenv").config();

const {
  PORT = 3001,
  MONGO_URL = "mongodb://127.0.0.1:27017/news_db",
  JWT_SECRET = "super-strong-secret",
} = process.env;

module.exports = {
  PORT,
  MONGO_URL,
  JWT_SECRET,
};
