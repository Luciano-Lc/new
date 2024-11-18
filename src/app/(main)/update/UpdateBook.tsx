"use client";

import { Book } from "@/lib/types";
import { useState } from "react";
import { updateBook } from "../book/edit/update/actions";

interface UpdateBookProps {
  book: Book;
}

export default function UpdateBook({ book }: UpdateBookProps) {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    try {
      await updateBook(formData);
    } catch (err) {
      setError("Failed to update book. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4">
      <input type="hidden" name="id" value={book.id} />
      
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={book.title}
          required
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
          Author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          defaultValue={book.author}
          required
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="publishYear" className="block text-sm font-medium text-gray-700">
          Publish Year
        </label>
        <input
          type="number"
          id="publishYear"
          name="publishYear"
          defaultValue={book.publishYear || ""}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={book.description || ""}
          rows={4}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          defaultValue={book.price}
          required
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="available"
            name="available"
            defaultChecked={book.available}
            className="rounded border-gray-300"
          />
          <span className="text-sm font-medium text-gray-700">Available</span>
        </label>
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? "Updating..." : "Update Book"}
      </button>
    </form>
  );
}