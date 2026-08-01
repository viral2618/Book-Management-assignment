import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import Book from "@/models/Book";
import { getUserIdFromRequest } from "@/utils/auth";

const bookSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  author: z.string().trim().min(1, "Author is required"),
  tags: z.array(z.string().trim()).default([]),
  status: z
    .enum(["want-to-read", "reading", "completed"])
    .default("want-to-read"),
});

export async function GET(request) {
  const userId = getUserIdFromRequest(request);

  if (!userId) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  await connectDB();

  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status");
  const tag = searchParams.get("tag");

  const query = { userId };
  if (status) {
    query.status = status;
  }
  if (tag) {
    query.tags = tag;
  }

  const books = await Book.find(query).sort({ createdAt: -1 });

  return NextResponse.json({ books });
}

export async function POST(request) {
  const userId = getUserIdFromRequest(request);

  if (!userId) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();

  const result = bookSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { message: result.error.issues[0].message },
      { status: 400 }
    );
  }

  await connectDB();

  const book = await Book.create({ ...result.data, userId });

  return NextResponse.json({ book }, { status: 201 });
}
