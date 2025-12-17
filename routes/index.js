const router = require("express").Router();

const userRouter = require("./users");
const articleRouter = require("./articles");
const newsRouter = require("./news");
const datasetRouter = require("./dataset");

router.use("/users", userRouter);
router.use("/articles", articleRouter);
router.use("/news", newsRouter);
router.use("/dataset", datasetRouter);

module.exports = router;
