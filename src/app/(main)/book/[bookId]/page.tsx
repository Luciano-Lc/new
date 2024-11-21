'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ViewBook from "./view/ViewBook";
import { Book } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { deleteBook, fetchBook } from "./view/actions";

export default function BookPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookId = searchParams.get("id"); // Assumes the book ID is passed as a query parameter
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (bookId) {
      fetchBook(bookId)
        .then((data) => setBook(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      setError("Book ID is missing");
      setLoading(false);
    }
  }, [bookId]);

  const handleEdit = () => {
    if (!bookId) return;
    router.push(`/edit?id=${bookId}`); // Assumes you have an edit page at `/edit`
  };

  const handleDelete = async () => {
    if (!bookId) return;
    const confirmation = confirm("Are you sure you want to delete this book?");
    if (!confirmation) return;

    const result = await deleteBook(bookId);
    if (result === "Book deleted successfully") {
      alert(result);
      router.push("/"); // Navigate back to the main page or list of books
    } else {
      alert(result);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <Button variant="outline" onClick={() => router.push("/")}>
        Back to List
      </Button>
      {book || error ? (
        <ViewBook 
          book={book} 
          error={error}
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
}
