const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    source: { id: String, name: String },
    author: String,
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    publishedAt: String,
    content: String,
  },
  { collection: "News" }
);

module.exports = mongoose.model("News", newsSchema);
