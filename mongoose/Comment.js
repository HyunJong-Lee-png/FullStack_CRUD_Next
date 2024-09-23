import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  comment: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true,
  }
}, { timestamps: true });

export default mongoose.models.comment || mongoose.model('comment', CommentSchema);