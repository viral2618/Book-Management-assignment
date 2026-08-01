import type { ReactNode } from "react";
import { BookOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-8 py-16 text-center shadow-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
        <BookOpen size={30} />
      </div>

      <h3 className="mt-5 text-xl font-semibold text-gray-800">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
        {description}
      </p>

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}