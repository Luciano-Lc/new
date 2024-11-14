// Then update the component state and handling:
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookValues } from '@/lib/validation';
import { createBook } from '../actions';

export default function CreateBookPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [bookData, setBookData] = useState({
    id: '',
    title: '',
    author: '',
    description: '',  // keep as string for form input
    publishYear: '',  // keep as string for form input
    price: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Convert to BookValues type with number
    const bookValues: BookValues = {
      ...bookData,
      publishYear: parseInt(bookData.publishYear, 10),
      price: 0
    };

    try {
      await createBook(bookValues);
      router.push('/book');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create book');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-semibold mb-6">Create Book</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col border-2 border-orange-500 rounded-xl p-6">
          <div className="space-y-4">
          <div>
              <label htmlFor="Id" className="block text-xl text-gray-500 mb-2">
                No.
              </label>
              <input
                id="id"
                name="id"
                type="number"
                required
                value={bookData.id}
                onChange={handleChange}
                className="border-2 border-gray-500 px-4 py-2 w-full rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-xl text-gray-500 mb-2">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={bookData.title}
                onChange={handleChange}
               className="border-2 border-gray-500 px-4 py-2 w-full rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label htmlFor="author" className="block text-xl text-gray-500 mb-2">
                Author
              </label>
              <input
                id="author"
                name="author"
                type="text"
                required
                value={bookData.author}
                onChange={handleChange}
                className="border-2 border-gray-500 px-4 py-2 w-full rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>


            <div>
              <label htmlFor="descriptionr" className="block text-xl text-gray-500 mb-2">
                Description          
              </label>
              <input
                id="description"
                name="description"
                type="text"
                required
                value={bookData.description}
                onChange={handleChange}
                className="border-2 border-gray-500 px-4 py-2 w-full rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
            
            <div>
              <label htmlFor="price" className="block text-xl text-gray-500 mb-2">
                Publish Year
              </label>
              <input
                id="publishYear"
                name="publishYear"
                type="publishYear"
                required
                value={bookData.publishYear}
                onChange={handleChange}
                className="border-2 border-gray-500 px-4 py-2 w-full rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-xl text-gray-500 mb-2">
                Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                required
                value={bookData.price}
                onChange={handleChange}
                className="border-2 border-gray-500 px-4 py-2 w-full rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 text-red-500 bg-red-50 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-6 p-3 bg-orange-500 text-white rounded-md hover:bg-orange-500 transition-colors
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Creating...' : 'Create Book'}
          </button>
        </div>
      </form>
    </div>
  );
}