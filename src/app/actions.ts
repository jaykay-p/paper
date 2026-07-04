"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createTodo(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;

  await prisma.todo.create({ data: { title } });
  revalidatePath("/");
}

export async function toggleTodo(id: string, completed: boolean) {
  await prisma.todo.update({ where: { id }, data: { completed } });
  revalidatePath("/");
}

export async function updateTodoTitle(id: string, title: string) {
  const trimmed = title.trim();
  if (!trimmed) return;

  await prisma.todo.update({ where: { id }, data: { title: trimmed } });
  revalidatePath("/");
}

export async function deleteTodo(id: string) {
  await prisma.todo.delete({ where: { id } });
  revalidatePath("/");
}
