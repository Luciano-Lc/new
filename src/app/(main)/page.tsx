import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import BookTable from "@/app/(main)/book/BookTable";
import BookSearch from "@/components/BookSearch";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/BookstoreTheme";

export default async function BooksPage({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  const page = Number(searchParams.page) || 1;
  const pageSize = 12;

  const books = await prisma.book.findMany({
    where: {
      userId: user.id,
      OR: searchParams.search
        ? [
            { title: { contains: searchParams.search, mode: "insensitive" } },
            { author: { contains: searchParams.search, mode: "insensitive" } },
            { description: { contains: searchParams.search, mode: "insensitive" } },
          ]
        : undefined,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader 
          title="My Books" 
          description="Manage your book collection"
        />
        <Link href="/book/create">
          <Button className="bg-primary hover:bg-primary/90">Add Book</Button>
        </Link>
      </div>
      <BookSearch />
      <BookTable books={books} view="grid" />
    </div>
  );
}