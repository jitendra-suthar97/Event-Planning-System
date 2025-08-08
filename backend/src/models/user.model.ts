import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyCode: {
      type: Number,
    },
    verifyCodeExpiry: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
    // events: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Events",
    //   },
    // ],
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
