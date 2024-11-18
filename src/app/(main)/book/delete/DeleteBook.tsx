"use client";
import { useState } from "react";
import { deleteBook } from "./actions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteBookProps {
  bookId: string;
  onDeleteSuccess?: () => void;
}

export default function DeleteBook({ bookId }: DeleteBookProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setIsDeleting(true);
      try {
        await deleteBook(bookId);
      } catch (error) {
        console.error(error);
        setIsDeleting(false);
      }
    }
  };

  return (
    <Button 
      variant="destructive" 
      onClick={handleDelete} 
      disabled={isDeleting}
      className="bg-red-600 hover:bg-red-700"
    >
      <Trash2 className="mr-2 h-4 w-4" />
      {isDeleting ? "Deleting..." : "Delete Book"}
    </Button>
  );

  
}