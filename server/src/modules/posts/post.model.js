import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    content: { type: String, required: true, maxlength: 5000 },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      index: true,
    },
    images: [{ url: String, publicId: String }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    tags: [String],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
