import { Book as PrismaBook } from "@prisma/client";

export interface Book extends PrismaBook { }
interface BookPageProps {
  params: {
    bookId: string;
  };
  book?: Book | null;
  error?: string | null;
  loading?: boolean;
}