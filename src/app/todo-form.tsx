"use client";

import { useActionState } from "react";
import { createTodo } from "./actions";

export function TodoForm() {
  const [error, formAction, isPending] = useActionState(createTodo, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          name="title"
          type="text"
          required
          placeholder="Add a to-do..."
          className="flex-1 rounded-md border border-black/10 dark:border-white/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 dark:focus:border-white/40"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium disabled:opacity-60"
        >
          {isPending ? "..." : "Add"}
        </button>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </form>
  );
}
