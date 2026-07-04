"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="text-sm text-black/60 dark:text-white/60">
        {error.message || "Something went wrong."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium"
      >
        Try again
      </button>
    </main>
  );
}
