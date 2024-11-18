// page.tsx
'use client'; // Ensure this is a client component

import React, { useEffect, useState } from 'react';
import DeleteBook from '../DeleteBook';
import { Button } from '@/components/ui/button';

interface Book {
  id: string;
  title: string;
  author: string;
}

const Page: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  

  // Fetch books from the backend
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('/api/books');
      const data: Book[] = await response.json();
      setBooks(data);
    };

    fetchBooks();
  }, []);

  // Handle book deletion from the UI
  const handleDeleteSuccess = (bookId: string) => {
    setBooks(books.filter((book) => book.id !== bookId));  // Remove deleted book from state
  };

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <div>
              <span>{book.title} by {book.author}</span>
              <DeleteBook
                bookId={book.id}
                onDeleteSuccess={() => handleDeleteSuccess(book.id)} // Remove from the UI after successful deletion
              />
                </div>
               
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
