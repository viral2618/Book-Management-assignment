"use client";

import { BookOpen } from "lucide-react";
import { getStatusLabel } from "@/utils/constants";

const statusBadgeClasses = {
  "want-to-read":
    "bg-sky-100 text-sky-700 border border-sky-200",
  reading:
    "bg-amber-100 text-amber-700 border border-amber-200",
  completed:
    "bg-emerald-100 text-emerald-700 border border-emerald-200",
};

export default function BookCard({ book, onEdit, onDelete }) {
  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
              <BookOpen size={18} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {book.title}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                by {book.author}
              </p>
            </div>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              statusBadgeClasses[book.status] ||
              statusBadgeClasses["want-to-read"]
            }`}
          >
            {getStatusLabel(book.status)}
          </span>
        </div>

        {book.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {book.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => onEdit(book)}
          className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium transition hover:bg-gray-100"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(book._id)}
          className="flex-1 rounded-lg bg-red-500 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}