import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getUserIdFromRequest } from "@/utils/auth";

export async function GET(request) {
  const userId = getUserIdFromRequest(request);

  if (!userId) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  await connectDB();

  const user = await User.findById(userId).select("name email");

  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json({
    user: { name: user.name, email: user.email },
  });
}
