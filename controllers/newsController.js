const News = require("../models/news");

exports.searchNews = async (req, res, next) => {
  try {
    const query = req.query.q || "";

    const articles = await News.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { "source.name": { $regex: query, $options: "i" } },
      ],
    });

    res.send(articles);
  } catch (error) {
    next(error);
  }
};
