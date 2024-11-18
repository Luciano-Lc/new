"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteBook(bookId: string) {
  try {
    await prisma.book.delete({
      where: { id: bookId },
    });
    revalidatePath("/books");
    redirect("/books"); // Redirect after successful deletion
  } catch (error) {
    console.error("Failed to delete book:", error);
    throw new Error("Failed to delete book");
  }
}