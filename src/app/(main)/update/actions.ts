
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateBook(formData: FormData) {
  const id = formData.get("id");
  const title = formData.get("title");
  const author = formData.get("author");
  const description = formData.get("description");
  const price = formData.get("price");
  const publishYear = formData.get("publishYear");
  const available = formData.get("available") === "on";

  if (!id || !title || !author || !price) {
    throw new Error("Missing required fields");
  }

  try {
    await prisma.book.update({
      where: { id: String(id) },
      data: {
        title: String(title),
        author: String(author),
        description: description ? String(description) : null,
        price: Number(price),
        publishYear: publishYear ? Number(publishYear) : null,
        available: available,
      },
    });

    revalidatePath("/book");
    redirect("/book");
  } catch (error) {
    console.error("Failed to update book:", error);
    throw new Error("Failed to update book");
  }
}