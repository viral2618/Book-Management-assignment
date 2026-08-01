import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import Book from "@/models/Book";
import { getUserIdFromRequest } from "@/utils/auth";

const bookSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  author: z.string().trim().min(1, "Author is required"),
  tags: z.array(z.string().trim()),
  status: z.enum(["want-to-read", "reading", "completed"]),
});

export async function PUT(request, { params }) {
  const userId = getUserIdFromRequest(request);

  if (!userId) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const result = bookSchema.partial().safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { message: result.error.issues[0].message },
      { status: 400 }
    );
  }

  await connectDB();

  const book = await Book.findOneAndUpdate(
    { _id: id, userId },
    { $set: result.data },
    { new: true, runValidators: true }
  );

  if (!book) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }

  return NextResponse.json({ book });
}

export async function DELETE(request, { params }) {
  const userId = getUserIdFromRequest(request);

  if (!userId) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;

  await connectDB();

  const book = await Book.findOneAndDelete({ _id: id, userId });

  if (!book) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Book deleted successfully" });
}
