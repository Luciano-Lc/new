export interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  price: number;
  available: boolean;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
  publishYear?: number;
}