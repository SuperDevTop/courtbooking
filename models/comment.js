const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  booker: {
    type: String,
    required: true,
  },

  player: {
    type: String,
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

// commentSchema.index({ booker: 1, player: 1 }, { unique: true });

module.exports = mongoose.model("Comment", commentSchema);
