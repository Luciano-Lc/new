'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Book } from "@/lib/types";
import EditBookForm from './BookEditForm';
import ViewBook from './[bookId]/view/ViewBook';
import { deleteBook } from './[bookId]/view/actions';




interface BookDetailContentProps {
  initialBook: Book;
}

export default function BookDetailContent({ initialBook }: BookDetailContentProps) {
  const [book, setBook] = useState(initialBook);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const handleUpdate = (updatedBook: Book) => {
    setBook(updatedBook);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(book.id);
        router.push('/books'); // Redirect after deletion
      } catch (error) {
        console.error('Failed to delete book', error);
        alert('Failed to delete the book');
      }
    }
  };

  if (isEditing) {
    return (
      <EditBookForm 
        book={book} 
        onCancel={() => setIsEditing(false)}
        onUpdate={handleUpdate}
      />
    );
  }

  return (
    <ViewBook 
      book={book} 
      onEdit={() => setIsEditing(true)}
      onDelete={handleDelete}
    />
  );
}