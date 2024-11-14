'use server';

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { BookValues } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBook(values: BookValues) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  await prisma.book.create({
    data: {
      ...values,
      userId: user.id,
    },
  });

  redirect("/book");
}

export async function updateBook(bookId: string, bookvalues: BookValues) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });

  if (!book || book.userId !== user.id) {
    throw new Error("Not found");
  }

  await prisma.book.update({
    where: { id: bookId },
    data: bookvalues,
  });

  redirect("/book");
}

export async function deleteBook(bookId: string) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });

  if (!book || book.userId !== user.id) {
    throw new Error("Not found");
  }

  await prisma.book.delete({
    where: { id: bookId },
  });

  revalidatePath("/book");
  redirect("/book");
}