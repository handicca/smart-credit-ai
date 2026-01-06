"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log error for monitoring (Sentry / LogRocket later)
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-14">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl p-6 shadow-sm text-center">
        
        {/* Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-red-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-xl font-bold text-slate-800">
          Something went wrong
        </h1>

        {/* Description */}
        <p className="mt-2 text-sm text-slate-600">
          We encountered an unexpected error while processing your request.
          Please try again or return to the homepage.
        </p>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all"
          >
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all"
          >
            Go home
          </Link>
        </div>

        {/* Technical hint (non-intrusive) */}
        <p className="mt-6 text-[12px] text-slate-400">
          If the problem persists, please contact support.
        </p>
      </div>
    </div>
  );
}
