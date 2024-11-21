'use client'; // This makes the component a Client Component

import React from "react";

interface DeleteButtonProps {
  onDelete: () => void;
}

export default function DeleteButton({ onDelete }: DeleteButtonProps) {
  const handleDelete = () => {
    const confirmed = confirm("Are you sure you want to delete this book?");
    if (confirmed) {
      onDelete();
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
    >
      Delete Book
    </button>
  );
}
