const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String },
    avatar: { type: String, trim: true },
    bio: { type: String, trim: true },
    birth: { type: String, trim: true },
    coverImage: { type: String, trim: true },
    createAt: { type: String },
    email: { type: String, trim: true },
    friend: { type: Array },
    gender: { type: String, trim: true },
    topic: { type: Array },
    userName: { type: String, trim: true },
    nickName: String,
  },
  { collection: "User" }
);

module.exports = mongoose.model("User", UserSchema);
