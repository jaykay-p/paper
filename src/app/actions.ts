"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function createTodo(formData: FormData) {
  const user = await requireUser();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;

  await prisma.todo.create({ data: { title, userId: user.id } });
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
