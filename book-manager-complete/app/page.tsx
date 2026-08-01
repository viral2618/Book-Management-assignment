import Link from "next/link";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has("token");

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <main className="flex w-full max-w-2xl flex-col items-center text-center">
        <span className="mb-4 rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200">
          Your reading companion
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Personal Book Manager
        </h1>
        <p className="mt-4 max-w-lg text-lg text-zinc-600 dark:text-zinc-400">
          Keep track of the books you want to read, the ones you are reading,
          and the ones you have finished. All in one simple place.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-lg border border-zinc-300 px-6 py-3 font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
