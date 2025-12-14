const express = require("express");
const router = express.Router();
const News = require("../models/news");

router.get("/search", async (req, res, next) => {
  try {
    const query = req.query.q || "";
    const results = await News.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { "source.name": { $regex: query, $options: "i" } },
      ],
    });
    res.send(results);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
