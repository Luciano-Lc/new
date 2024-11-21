'use server';

import { Book } from "@/lib/types";

const API_URL = "/api/books"; // Update with your actual API endpoint

/**
 * Fetch a book by its ID
 * @param id - The ID of the book
 * @returns A book object or null if not found
 */
export async function fetchBook(id: string): Promise<Book | null> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch book with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Update a book by its ID
 * @param id - The ID of the book
 * @param updates - Partial updates to the book
 * @returns Updated book object
 */
export async function updateBook(id: string, updates: Partial<Book>): Promise<Book | null> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error(`Failed to update book with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Delete a book by its ID
 * @param id - The ID of the book
 * @returns A success or failure message
 */export async function deleteBook(bookId: string): Promise<string> {
  if (!bookId) {
    throw new Error("Book ID is required");
  }

  const response = await fetch(`/api/books/${bookId}`, { method: "DELETE" });

  if (!response.ok) {
    throw new Error("Failed to delete the book");
  }

  return "Book deleted successfully";
}


/**
 * Fetch all books
 * @returns A list of books
 */
export async function fetchBooks(): Promise<Book[]> {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
