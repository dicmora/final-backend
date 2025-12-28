const router = require("express").Router();

const userRouter = require("./users");
const articleRouter = require("./articles");
const newsRouter = require("./news");
const datasetRouter = require("./dataset");

router.userRouter = userRouter;
router.articleRouter = articleRouter;
router.newsRouter = newsRouter;
router.datasetRouter = datasetRouter;

module.exports = router;
