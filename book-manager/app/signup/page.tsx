"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm<{
    name: string;
    email: string;
    password: string;
  }>();

  async function onSubmit(data: {
    name: string;
    email: string;
    password: string;
  }) {
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.message || "Something went wrong. Please try again.");
      return;
    }

    router.replace("/dashboard");
  }

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Start tracking your books in under a minute.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              required
              {...register("name")}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-indigo-900"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              {...register("email")}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-indigo-900"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="At least 6 characters"
              required
              minLength={6}
              {...register("password")}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-indigo-900"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
