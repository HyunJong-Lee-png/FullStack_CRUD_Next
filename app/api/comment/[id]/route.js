import { NextResponse } from "next/server";
import { commentController } from "../../../../mongoose/CommentController";
import dbConnect from "../../../../mongoose/connect";

export async function PATCH(request, { params: { id } }) {
  await dbConnect();
  const { comment } = await request.json();
  const updateComment = await commentController.updateComment(id, comment);
  if (updateComment) {
    await updateComment.populate('author');
    return NextResponse.json({ ok: true, ...updateComment });
  }
  return NextResponse.json({ ok: false })
}


export async function DELETE(_, { params: { id } }) {
  await dbConnect();
  const boolean = await commentController.deleteComment(id);
  if (boolean) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false });
}