import mongoose from "mongoose";

const userReg = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      maxlength: 100,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 10,
      
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    username: {
      type: String,
      required: true,
      lowercase:true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    deletedAt: {
      type: Date
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('User',userReg);
