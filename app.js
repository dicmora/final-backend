require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const routes = require("./routes/index");

const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/error-handler");
const auth = require("./middlewares/auth");

const {
  validateLogin,
  validateUserCreation,
} = require("./middlewares/validation");
const { login, createUser } = require("./controllers/usersController");

const { PORT = 3001, MONGO_URL = "mongodb://127.0.0.1:27017/news_db" } =
  process.env;

const app = express();

const allowedOrigins = [
  "https://dailynews.mysaol.com",
  "http://localhost:3000",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(requestLogger);

// Public routes
app.post("/signup", validateUserCreation, createUser);
app.post("/signin", validateLogin, login);

app.use(auth);

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

// MongoDB connection
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
