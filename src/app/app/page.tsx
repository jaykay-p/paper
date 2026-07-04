import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { FREE_TODO_LIMIT, isBillingConfigured, isPro } from "@/lib/billing";
import { logOut } from "../(auth)/actions";
import { PlanBadge } from "../plan-badge";
import { TodoForm } from "../todo-form";
import { TodoItem } from "../todo-item";

export const dynamic = "force-dynamic";

export default async function AppHome({
  searchParams,
}: {
  searchParams: Promise<{ upgraded?: string }>;
}) {
  const user = await requireUser();
  const { upgraded } = await searchParams;
  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });
  const pro = isPro(user);

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
          <div className="mt-3 flex justify-center">
            <PlanBadge isPro={pro} billingConfigured={isBillingConfigured()} />
          </div>
        </div>

        {upgraded === "1" ? (
          <p className="rounded-md border border-green-600/20 bg-green-600/10 px-3 py-2 text-center text-sm text-green-700 dark:text-green-400">
            You&apos;re on paper Pro. Welcome aboard!
          </p>
        ) : null}

        <TodoForm />

        {!pro && todos.length > 0 ? (
          <p className="text-center text-xs text-black/40 dark:text-white/40">
            {todos.length}/{FREE_TODO_LIMIT} to-dos used on the Free plan
            {" · "}
            <Link href="/upgrade" className="underline underline-offset-2">
              Upgrade
            </Link>
          </p>
        ) : null}

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
