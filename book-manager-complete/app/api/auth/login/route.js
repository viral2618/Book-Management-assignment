import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { signToken, TOKEN_NAME } from "@/utils/auth";

const loginSchema = z.object({
  email: z.string().trim().email("Please enter valid email format"),
  password: z.string().min(1, "Password required"),
});

export async function POST(request) {
  try {
    const body = await request.json();

    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email  or password" },
        { status: 401 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid email or passsword" },
        { status: 401 }
      );
    }

    const token = signToken(user._id.toString());

    const response = NextResponse.json({
      message: "LoggedIn Sucessfully",
      user: { name: user.name, email: user.email },
    });

    response.cookies.set(TOKEN_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Something went wrong please try again." },
      { status: 500 }
    );
  }
}
