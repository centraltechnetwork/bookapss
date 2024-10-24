import mongoose from "mongoose";

const books = new mongoose.schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: {
    type: String,
    required: true,
    enum: ["comedy", "romance", "horror", "fiction"],
  },
  publicationYear: { type: Number, required: true },
  
})

export const Books = mongoose.model("Books", books);
