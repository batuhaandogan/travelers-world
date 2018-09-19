const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  post: {type: Schema.Types.ObjectId, ref:"Post"},
  star: Boolean,
  content: String,
  
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Comments = mongoose.model("Comments", commentSchema);

module.exports = Comments;
