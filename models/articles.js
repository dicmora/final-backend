const mongoose = require("mongoose");
const validator = require("validator");

const articleSchema = new mongoose.Schema({
  keyword: { type: String, required: [true, "Keyword required"] },
  title: { type: String, required: [true, "Title required"] },
  text: { type: String, required: [true, "Text required"] },
  date: { type: String, required: [true, "Date required"] },
  source: { type: String, required: [true, "Source required"] },
  link: {
    type: String,
    required: [true, "Link required"],
    validate: {
      validator: (v) => validator.isURL(v),
      message: (props) => `${props.path} is not a valid URL: ${props.value}`,
    },
  },
  image: {
    type: String,
    required: [true, "Image required"],
    validate: {
      validator: (v) => validator.isURL(v),
      message: (props) => `${props.path} is not a valid URL: ${props.value}`,
    },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Article", articleSchema);
