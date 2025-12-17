const express = require("express");
const mongoose = require("mongoose");
const { NotFoundError } = require("../errors");

const router = express.Router();

router.get("/:name", async (req, res, next) => {
  try {
    const collectionNameParam = req.params.name.toLowerCase();

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    const collectionInfo = collections.find(
      (c) => c.name.toLowerCase() === collectionNameParam
    );

    if (!collectionInfo) {
      throw new NotFoundError("Collection not found");
    }

    const items = await mongoose.connection.db
      .collection(collectionInfo.name)
      .find()
      .toArray();

    res.json(items);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
