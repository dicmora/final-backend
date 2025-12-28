const Article = require("../models/articles");
const { BadRequestError, NotFoundError, ForbiddenError } = require("../errors");

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

const saveArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(201).send(article))
    .catch((err) => {
      console.error("ARTICLE CREATE ERROR:", err);

      if (err.name === "ValidationError") {
        res.status(400).json({ message: err.message });
      } else {
        next(err);
      }
    });
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  Article.findById(articleId)
    .orFail(() => new NotFoundError("Article not found"))
    .then((article) => {
      if (String(article.owner) !== String(req.user._id)) {
        throw new ForbiddenError("You are not allowed to delete this article");
      }
      return Article.findByIdAndDelete(articleId);
    })
    .then((deleted) => res.send(deleted))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID format"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getArticles,
  saveArticle,
  deleteArticle,
};
