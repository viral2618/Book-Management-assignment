"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import StatsCards from "@/components/StatsCards";
import BookFilters from "@/components/BookFilters";
import BookCard from "@/components/BookCard";
import BookForm from "@/components/BookForm";
import Spinner from "@/components/Spinner";
import EmptyState from "@/components/EmptyState";

interface Book {
  _id: string;
  title: string;
  author: string;
  tags: string[];
  status: "want-to-read" | "reading" | "completed";
}

interface BookInput {
  title: string;
  author: string;
  tags: string[];
  status: Book["status"];
}

interface User {
  name: string;
  email: string;
}

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const userRes = await fetch("/api/auth/me");
        if (userRes.status === 401) {
          router.replace("/login");
          return;
        }
        const userData = await userRes.json();
        setUser(userData.user);

        const booksRes = await fetch("/api/books");
        const booksData = await booksRes.json();
        setBooks(booksData.books);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [router]);

  const filteredBooks = books.filter((book) => {
    if (statusFilter !== "all" && book.status !== statusFilter) {
      return false;
    }
    if (tagFilter !== "all" && !book.tags.includes(tagFilter)) {
      return false;
    }
    return true;
  });

  const stats = {
    total: books.length,
    wantToRead: books.filter((book) => book.status === "want-to-read").length,
    reading: books.filter((book) => book.status === "reading").length,
    completed: books.filter((book) => book.status === "completed").length,
  };

  const allTags = [...new Set(books.flatMap((book) => book.tags))].sort();

  async function handleAddBook(data: BookInput) {
    const res = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      alert(json.message || "Could not add the book.");
      return;
    }

    setBooks((prev) => [json.book, ...prev]);
    setShowForm(false);
  }

  async function handleUpdateBook(id: string, data: BookInput) {
    const res = await fetch(`/api/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      alert(json.message || "Could not update the book.");
      return;
    }

    setBooks((prev) => prev.map((book) => (book._id === id ? json.book : book)));
    setShowForm(false);
    setEditingBook(null);
  }

  async function handleDeleteBook(id: string) {
    if (!confirm("Are you sure you want to delete this book?")) {
      return;
    }

    const res = await fetch(`/api/books/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const json = await res.json();
      alert(json.message || "Could not delete the book.");
      return;
    }

    setBooks((prev) => prev.filter((book) => book._id !== id));
  }

  function handleFormSubmit(data: BookInput) {
    if (editingBook) {
      handleUpdateBook(editingBook._id, data);
    } else {
      handleAddBook(data);
    }
  }

  function handleEdit(book: Book) {
    setEditingBook(book);
    setShowForm(true);
  }

  function handleCancelForm() {
    setShowForm(false);
    setEditingBook(null);
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
  }

  return (
    <div className="flex flex-1 flex-col">
      <Navbar userName={user?.name} onLogout={handleLogout} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        {loading ? (
          <Spinner label="Loading your books..." />
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-2xl font-bold">My Books</h1>
              <button
                onClick={() => {
                  setEditingBook(null);
                  setShowForm(true);
                }}
                className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-700"
              >
                Add Book
              </button>
            </div>

            <StatsCards stats={stats} />

            {books.length > 0 && (
              <div className="mt-6">
                <BookFilters
                  statusFilter={statusFilter}
                  onStatusChange={setStatusFilter}
                  tagFilter={tagFilter}
                  onTagChange={setTagFilter}
                  tags={allTags}
                />
              </div>
            )}

            {showForm && (
              <div className="mt-6">
                <BookForm
                  key={editingBook ? editingBook._id : "new"}
                  initialBook={editingBook}
                  onSubmit={handleFormSubmit}
                  onCancel={handleCancelForm}
                />
              </div>
            )}

            <div className="mt-6">
              {filteredBooks.length === 0 ? (
                books.length === 0 ? (
                  <EmptyState
                    title="No books yet"
                    description="Add your first book to start tracking your reading."
                    action={
                      <button
                        onClick={() => {
                          setEditingBook(null);
                          setShowForm(true);
                        }}
                        className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-700"
                      >
                        Add your first book
                      </button>
                    }
                  />
                ) : (
                  <EmptyState
                    title="No books match your filters"
                    description="Try changing the status or tag filter to see more books."
                  />
                )
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredBooks.map((book) => (
                    <BookCard
                      key={book._id}
                      book={book}
                      onEdit={handleEdit}
                      onDelete={handleDeleteBook}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
