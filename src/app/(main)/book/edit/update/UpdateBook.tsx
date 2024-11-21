'use client';

interface UpdateBookProps {
  id: string;
  book: {
    title: string;
    author: string;
    description?: string;
  };
}

export default function UpdateBook({ id, book }: UpdateBookProps) {
  return (
    <div>
      <h1>Update Book: {book.title}</h1>
      <p>Author: {book.author}</p>
    </div>
  );
}
