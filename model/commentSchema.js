const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    answer: { type: String, trim: true },
    createAt: { type: Date },
    like: { type: Array },
    dislike: { type: Array },
    initVote: { type: Number },
    owner: { type: String, trim: true },
    question: { type: String, trim: true },
    likeCount: { type: Number },
  },
  { collection: "Comment" }
);

module.exports = mongoose.model("Comment", CommentSchema);
