import mongoose from "mongoose";

const adminReg = new mongoose.Schema(
  {
    username: { 
        type: String, 
        required: true
     },
    email: { 
        type: String, 
        required: true, 
        unique: true },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
    },
    password: { 
        type: String, 
        required: true 
    },
  },
  { timestamps: true }
);

export const Admin = mongoose.model('admin',adminReg);
