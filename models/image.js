const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    term: String,
    image: String,
    slug: String
  }
);

module.exports = mongoose.model('Image', imageSchema);