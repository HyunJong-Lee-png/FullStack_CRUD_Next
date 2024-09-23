import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "이름을입력하세요"],
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  married: {
    type: Boolean,
    default: false,
  },
  comment: {
    type: mongoose.Schema.ObjectId,
    ref: 'comment',
  }

}, { timestamps: true });

export default mongoose.models.user || mongoose.model('user', UserSchema);