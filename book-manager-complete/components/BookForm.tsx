"use client";

import { useForm } from "react-hook-form";
import { BookOpen, UserPen, Tags, ListTodo } from "lucide-react";
import { STATUS_OPTIONS } from "@/utils/constants";

type BookStatus = "want-to-read" | "reading" | "completed";

interface InitialBook {
  _id: string;
  title: string;
  author: string;
  tags: string[];
  status: BookStatus;
}

interface BookFormData {
  title: string;
  author: string;
  tags: string[];
  status: BookStatus;
}

interface BookFormProps {
  initialBook?: InitialBook | null;
  onSubmit: (data: BookFormData) => void;
  onCancel: () => void;
}

const inputClasses =
  "w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

export default function BookForm({
  initialBook = null,
  onSubmit,
  onCancel,
}: BookFormProps) {
  const { register, handleSubmit } = useForm<{
    title: string;
    author: string;
    tags: string;
    status: BookStatus;
  }>({
    defaultValues: initialBook
      ? {
          title: initialBook.title,
          author: initialBook.author,
          tags: initialBook.tags.join(", "),
          status: initialBook.status,
        }
      : {
          title: "",
          author: "",
          tags: "",
          status: "want-to-read",
        },
  });

  function handleFormSubmit(data: {
    title: string;
    author: string;
    tags: string;
    status: BookStatus;
  }) {
    const tags = data.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    onSubmit({
      title: data.title,
      author: data.author,
      tags,
      status: data.status,
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        {initialBook ? "Edit Book" : "Add New Book"}
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Fill in the details below to manage your reading collection.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Book Title
          </label>

          <div className="relative">
            <BookOpen
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Atomic Habits"
              required
              {...register("title")}
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Author
          </label>

          <div className="relative">
            <UserPen
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="James Clear"
              required
              {...register("author")}
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Tags
          </label>

          <div className="relative">
            <Tags
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Self Help, Productivity"
              {...register("tags")}
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Reading Status
          </label>

          <div className="relative">
            <ListTodo
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              {...register("status")}
              className={`${inputClasses} appearance-none`}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          {initialBook ? "Save Changes" : "Add Book"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}