import Comment from "./Comment";
import User from "./user";

export const commentController = {};

commentController.getComments = async (userId) => {
  const comments = await Comment.find({ author: userId }).populate('author');
  return comments;
}

commentController.createComment = async ({ id, comment }) => {
  try {
    const user = await User.findById(id);
    if (user) {
      const newComment = await Comment.create({
        comment,
        author: user._id,
      });
      return newComment;
    }
  } catch (e) {
    console.log(e.message);
  }
};

commentController.updateComment = async (id, comment) => {
  const updateComment = await Comment.findByIdAndUpdate(id, {
    comment,
  }, { new: true });
  if (updateComment) {
    return updateComment;
  }
};

commentController.deleteComment = async (id) => {
  const deletedDoc = await Comment.findByIdAndDelete(id);
  if (deletedDoc) {
    return true;
  }
  return false;
}