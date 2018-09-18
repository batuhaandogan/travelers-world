const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  star:String,
  content: String,
  
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Comment= mongoose.model("Comment", postSchema);

module.exports = Comment;