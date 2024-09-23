import { NextResponse } from "next/server";
import dbConnect from "../../../mongoose/connect";
import { userController } from "../../../mongoose/userController";

export async function GET() {
  await dbConnect();
  const users = await userController.getAll();
  return NextResponse.json(users);
}

export async function POST(request) {
  await dbConnect();
  const userData = await request.json();
  const newUser = await userController.createUser(userData);
  if (newUser) {
    return NextResponse.json({ ok: true, ...newUser });
  }
  return NextResponse.json({ ok: false });
};

// export async function PATCH(request) {
//   await dbConnect();
//   const updateUserData = await request.json();
//   const newComment = await commentController.createComment(updateUserData);
//   if (newComment) {
//     const updateUser = await userController.updateUser(newComment);
//     if (updateUser) {
//       const populatedUser = await updateUser.populate('comment');
//       if (populatedUser) {
//         return NextResponse.json({ ok: true, ...populatedUser });
//       }
//     }
//   }

//   return NextResponse.json({ ok: false });
// }