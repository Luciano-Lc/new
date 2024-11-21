'use client';

import { Book } from "@/lib/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";

interface ViewBookProps {
  book: Book | null;
  error?: string | null;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ViewBook({ 
  book, 
  error,
  onEdit,
  onDelete
}: ViewBookProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!book) {
    return <div>No book found</div>;
  }

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {book.title}
          <div className="flex space-x-2">
            {onEdit && (
              <Button 
                variant="outline" 
                size="icon" 
                onClick={onEdit}
                title="Edit Book"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button 
                variant="destructive" 
                size="icon" 
                onClick={onDelete}
                title="Delete Book"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <strong>Author:</strong> {book.author}
          </div>

          {book.description && (
            <div>
              <strong>Description:</strong>
              <p className={`${!isExpanded ? 'line-clamp-3' : ''}`}>
                {book.description}
              </p>
              {book.description.length > 100 && (
                <Button 
                  variant="link" 
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? 'Show Less' : 'Show More'}
                </Button>
              )}
            </div>
          )}

          {book.createdAt && (
            <div>
              <strong>Added On:</strong> {new Date(book.createdAt).toLocaleDateString()}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}