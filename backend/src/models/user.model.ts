import { Document, Schema, model } from "mongoose";

export interface UserDocument extends Document {
  userName: string;
  email: string;
  password: string;
  profileImage: string;
  isVerified: boolean;
  verifyCode: number | undefined;
  verifyCodeExpiry: Date | undefined;
  refreshToken: string;
}

const userSchema = new Schema<UserDocument>(
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

const User = model<UserDocument>("User", userSchema);

export default User;
