const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const profileSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  username: String,
  imgPath: String,
  image: String,
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;