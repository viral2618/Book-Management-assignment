"use client";

import { Filter, Tags } from "lucide-react";
import { STATUS_OPTIONS } from "@/utils/constants";

const selectClasses =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

export default function BookFilters({
  statusFilter,
  onStatusChange,
  tagFilter,
  onTagChange,
  tags,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
      
        <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Filter Books
        </h2>
        <p className="text-sm text-gray-500">
          Find books by reading status or tags.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
      
        <div className="relative">
          <Filter
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className={`${selectClasses} pl-10`}
          >
            <option value="all">All Status</option>

            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <Tags
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <select
            value={tagFilter}
            onChange={(e) => onTagChange(e.target.value)}
            className={`${selectClasses} pl-10`}
          >
            <option value="all">All Tags</option>

            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}