// /app/api/books/update/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = new URLSearchParams(await req.text());
    const id = formData.get("id")!;
    const title = formData.get("title")!;
    const author = formData.get("author")!;
    const description = formData.get("description") || null;
    const price = formData.get("price")!;
    const publishYear = formData.get("publishYear") || null;
    const available = formData.get("available") === "on";

    await prisma.book.update({
      where: { id },
      data: {
        title,
        author,
        description,
        price: Number(price),
        publishYear: publishYear ? Number(publishYear) : null,
        available,
      },
    });

    return NextResponse.redirect(`/book/${id}`);
  } catch (error) {
    console.error("Error updating book:", error);
    return new NextResponse("Failed to update book", { status: 500 });
  }
}
