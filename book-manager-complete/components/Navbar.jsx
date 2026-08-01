"use client";

import { BookOpen } from "lucide-react";

export default function Navbar({ userName, onLogout }) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-blue-600 p-2 text-white">
            <BookOpen size={20} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-gray-900">
              Personal Book Manager
            </h1>
            <p className="text-xs text-gray-500">
              Organize your reading journey
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          {userName && (
            <div className="hidden text-right sm:block">
              <p className="text-xs text-gray-500">Welcome back 👋</p>
              <p className="font-medium text-gray-800">{userName}</p>
            </div>
          )}

          <button
            onClick={onLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}