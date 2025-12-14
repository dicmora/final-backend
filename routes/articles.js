const express = require("express");
const auth = require("../middlewares/auth");
const {
  getArticles,
  saveArticle,
  deleteArticle,
} = require("../controllers/articles");
const { validateArticle, validateId } = require("../middlewares/validation");

const router = express.Router();

router.use(auth);

router.get("/", getArticles);
router.post("/", validateArticle, saveArticle);
router.delete("/:articleId", validateId, deleteArticle);

module.exports = router;
