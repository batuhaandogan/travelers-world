const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

// const Post = "./post.js"

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  email: String,
  slackID: String,
  googleID: String,
  date: Number,
  contact: Number,
  address: String,
  imgName: String,
  imgPath: String,
  post: {type: Schema.Types.ObjectId, ref: "post"},
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;