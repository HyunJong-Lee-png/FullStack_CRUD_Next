import { NextResponse } from "next/server";
import { commentController } from "../../../../../mongoose/CommentController";
import dbConnect from "../../../../../mongoose/connect";

export async function GET(_, { params: { id } }) {
  await dbConnect();
  const comments = await commentController.getComments(id);
  return NextResponse.json(comments)
}