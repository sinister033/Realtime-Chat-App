import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 5,
    max: 25,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    max: 60,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  HasAvatarImage: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
});

export default mongoose.model("Users", UserSchema);
