import { NextResponse } from "next/server";
import { commentController } from "../../../mongoose/CommentController";
import dbConnect from "../../../mongoose/connect";

export async function POST(request) {
  await dbConnect();
  const commentData = await request.json();
  const newComment = await commentController.createComment(commentData);
  if (newComment) {
    await newComment.populate('author');
    return NextResponse.json({ ok: true, ...newComment });
  }
  return NextResponse.json({ ok: false });
}


