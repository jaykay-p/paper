"use client";

import { useState, useTransition } from "react";
import type { TodoModel } from "@/generated/prisma/models";
import { deleteTodo, toggleTodo, updateTodoTitle } from "./actions";

export function TodoItem({ todo }: { todo: TodoModel }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(() => {
      toggleTodo(todo.id, !todo.completed);
    });
  }

  function handleDelete() {
    startTransition(() => {
      deleteTodo(todo.id);
    });
  }

  function handleSubmitEdit(e: React.FormEvent) {
    e.preventDefault();
    setIsEditing(false);
    startTransition(() => {
      updateTodoTitle(todo.id, title);
    });
  }

  return (
    <li
      className="flex items-center gap-3 rounded-md border border-black/10 dark:border-white/10 px-3 py-2"
      style={{ opacity: isPending ? 0.6 : 1 }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="h-4 w-4 shrink-0"
        aria-label={`Mark "${todo.title}" as ${todo.completed ? "not completed" : "completed"}`}
      />

      {isEditing ? (
        <form onSubmit={handleSubmitEdit} className="flex-1 flex gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            onBlur={handleSubmitEdit}
            className="flex-1 rounded border border-black/20 dark:border-white/30 bg-transparent px-2 py-1 text-sm outline-none"
          />
        </form>
      ) : (
        <button
          type="button"
          onDoubleClick={() => setIsEditing(true)}
          className={`flex-1 text-left text-sm ${
            todo.completed ? "line-through text-black/40 dark:text-white/40" : ""
          }`}
        >
          {todo.title}
        </button>
      )}

      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="text-xs text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
        aria-label={`Edit "${todo.title}"`}
      >
        Edit
      </button>
      <button
        type="button"
        onClick={handleDelete}
        className="text-xs text-red-600/70 hover:text-red-600"
        aria-label={`Delete "${todo.title}"`}
      >
        Delete
      </button>
    </li>
  );
}
