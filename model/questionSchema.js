const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    // _id: { type: mongoose.Schema.Types.ObjectId },
    createAt: { type: Date },
    owner: { type: String, trim: true },
    question: { type: String, trim: true },
    topic: { type: Array },
    commentCount: { type: Number },
  },
  { collection: "Question" }
);

module.exports = mongoose.model("Question", QuestionSchema);
