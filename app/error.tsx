"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-page px-4 text-center text-ink">
      <h2 className="font-serif text-2xl font-medium">Something went wrong</h2>
      <p className="max-w-md text-body-ui text-ink-secondary">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-xl bg-terracotta px-5 py-2.5 font-sans text-body-ui font-medium text-ivory transition-opacity hover:opacity-95"
      >
        Try again
      </button>
    </div>
  );
}
