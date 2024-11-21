'use client'; // Mark this page as a Client Component if needed

import React from "react";
import { useRouter } from "next/navigation";
import DeleteButton from "../DeleteBook";

interface BookDeletePageProps {
  bookId: string;
}

export default function BookDeletePage({ bookId }: BookDeletePageProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      // Replace with your delete logic
      const response = await fetch(`/api/books/${bookId}`, { method: "DELETE" });
      if (response.ok) {
        alert("Book deleted successfully!");
        router.push("/"); // Redirect after deletion
      } else {
        alert("Failed to delete book.");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <DeleteButton onDelete={handleDelete} />
    </div>
  );
}
