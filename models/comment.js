const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  booker: {
    type: String,
    required: true,
  },

  player: {
    type: String,
    required: true,
  },

  isPermanent: {
    type: Boolean,
    required: true,
    default: false,
  },

  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
