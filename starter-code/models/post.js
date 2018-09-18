const mongoose = require("mongoose");
const Schema   = mongoose.Schema;


const postSchema = new Schema({
//   picture:String,
  content: String,
  comments:  {type: Schema.Types.ObjectId, ref: "comments"},
  imgName: String,
  imgPath: String,
  owner: {type: Schema.Types.ObjectId, ref: "User"}
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;