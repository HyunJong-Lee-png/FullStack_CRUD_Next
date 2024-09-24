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
