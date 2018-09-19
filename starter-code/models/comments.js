const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  star: Boolean,
  content: String,
  
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Comments = mongoose.model("Comments", commentSchema);

module.exports = Comments;
