'use client';

import { useState, FormEvent } from "react";
import { Book } from "@/lib/types";
import UpdateBook from "../update/UpdateBook";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EditBookFormProps {
  book: Book;
  onCancel: () => void;
  onUpdate: (updatedBook: Book) => void;
}



export default function EditBookForm({ 
  book, 
  onCancel, 
  onUpdate 
}: EditBookFormProps) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [description, setDescription] = useState(book.description || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const updatedBook = UpdateBook({
          id: book.id,
          title,
          author,
          description
      });

      onUpdate(updatedBook);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Edit Book</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-red-500 mb-4">{error}</div>
          )}

          <div>
            <label htmlFor="title" className="block mb-2">Title</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Book Title"
            />
          </div>

          <div>
            <label htmlFor="author" className="block mb-2">Author</label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              placeholder="Book Author"
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-2">Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Book Description"
              rows={4}
            />
          </div>

          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Book'}
            </Button>
          </div>
        </form>
          </CardContent>
          
    </Card>
  );
}