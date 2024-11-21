// Mark this component as a Client Component
"use client"; // Add this line at the top

import { useState } from "react";

interface UpdateBookProps {
  id: string;
  book: {
    title: string;
    author: string;
    description?: string;
    price: number;
    publishYear?: number;
    available: boolean;
  };
}

export default function UpdateBook({ id, book }: UpdateBookProps) {
  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    description: book.description || "",
    price: book.price,
    publishYear: book.publishYear || "",
    available: book.available,
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" , value,
    }));
  };

  // Submit form data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("id", id);
    form.append("title", formData.title);
    form.append("author", formData.author);
    form.append("description", formData.description);
    form.append("price", formData.price.toString());
    form.append("publishYear", formData.publishYear.toString());
    form.append("available", formData.available ? "on" : "off");

    try {
      const response = await fetch("/api/books/update", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        throw new Error("Failed to update book");
      }

      // Redirect to the book page after successful update
      window.location.href = `/book/${id}`;
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Update Book: {book.title}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="author" className="block">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="price" className="block">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="publishYear" className="block">Publish Year</label>
          <input
            type="number"
            id="publishYear"
            name="publishYear"
            value={formData.publishYear}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="available" className="block">Available</label>
          <input
            type="checkbox"
            id="available"
            name="available"
            checked={formData.available}
            onChange={handleChange}
            className="border p-2"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Update Book
          </button>
        </div>
      </form>
    </div>
  );
}
