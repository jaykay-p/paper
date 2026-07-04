"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { FREE_TODO_LIMIT, isPro } from "@/lib/billing";

export async function createTodo(
  _prevState: string | undefined,
  formData: FormData,
) {
  const user = await requireUser();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;

  const pro = isPro(user);
  const created = await prisma.$transaction(async (tx) => {
    if (!pro) {
      const count = await tx.todo.count({ where: { userId: user.id } });
      if (count >= FREE_TODO_LIMIT) return null;
    }
    return tx.todo.create({ data: { title, userId: user.id } });
  });

  if (!created) {
    return `Free plan is limited to ${FREE_TODO_LIMIT} to-dos. Upgrade to add more.`;
  }

  revalidatePath("/");
}

export async function toggleTodo(id: string, completed: boolean) {
  const user = await requireUser();
  await prisma.todo.updateMany({
    where: { id, userId: user.id },
    data: { completed },
  });
  revalidatePath("/");
}

export async function updateTodoTitle(id: string, title: string) {
  const user = await requireUser();
  const trimmed = title.trim();
  if (!trimmed) return;

  await prisma.todo.updateMany({
    where: { id, userId: user.id },
    data: { title: trimmed },
  });
  revalidatePath("/");
}

export async function deleteTodo(id: string) {
  const user = await requireUser();
  await prisma.todo.deleteMany({ where: { id, userId: user.id } });
  revalidatePath("/");
}
