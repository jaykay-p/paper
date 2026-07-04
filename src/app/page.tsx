import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { createTodo } from "./actions";
import { logOut } from "./(auth)/actions";
import { TodoItem } from "./todo-item";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await requireUser();
  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });

  return (
    <main className="flex flex-1 flex-col items-center gap-8 p-8">
      <div className="w-full max-w-md flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight">paper</h1>
          <p className="text-lg text-black/60 dark:text-white/60">
            Simple, fast to-dos.
          </p>
          <div className="mt-2 flex items-center justify-center gap-2 text-sm text-black/50 dark:text-white/50">
            <span>{user.email}</span>
            <form action={logOut}>
              <button type="submit" className="underline underline-offset-2">
                Log out
              </button>
            </form>
          </div>
        </div>

        <form
          action={createTodo}
          className="flex gap-2"
        >
          <input
            name="title"
            type="text"
            required
            placeholder="Add a to-do..."
            className="flex-1 rounded-md border border-black/10 dark:border-white/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 dark:focus:border-white/40"
          />
          <button
            type="submit"
            className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium"
          >
            Add
          </button>
        </form>

        {todos.length === 0 ? (
          <p className="text-center text-sm text-black/40 dark:text-white/40">
            No to-dos yet. Add one above.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
