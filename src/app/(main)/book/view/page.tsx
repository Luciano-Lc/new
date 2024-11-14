"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, BookOpen } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface BookValues {
  id: string;
  title: string;
  author: string;
  publishYear: number;
  description: string;
  price: number;
}

interface BookPageProps {
  params: {
    bookId: string;
  };
}

const BookView = ({ params }: BookPageProps) => {
  const { bookId } = params;
  const [book, setBook] = useState<BookValues | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/books/${bookId}`);
        if (!response.ok) {
          throw new Error('Book not found');
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load book');
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);


  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!book) return null;

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl font-bold">Book Details</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Title</label>
            <div className="mt-1 p-3 bg-gray-50 rounded-md border">
              {book.title}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Author</label>
            <div className="mt-1 p-3 bg-gray-50 rounded-md border">
              {book.author}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Publish Year</label>
            <div className="mt-1 p-3 bg-gray-50 rounded-md border">
              {book.publishYear}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Description</label>
            <div className="mt-1 p-3 bg-gray-50 rounded-md border min-h-[100px]">
              {book.description}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Price</label>
            <div className="mt-1 p-3 bg-gray-50 rounded-md border">
              ${book.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookView;