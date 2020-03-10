const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    term: {
      type: String,
      required: true
    },
    definition: String,
    slug: String
  }
);

module.exports = mongoose.model('Image', imageSchema);