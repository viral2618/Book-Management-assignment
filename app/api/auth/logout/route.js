import { NextResponse } from "next/server";
import { TOKEN_NAME } from "@/utils/auth";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out Sucessfully" });

  response.cookies.delete(TOKEN_NAME);

  return response;
}
