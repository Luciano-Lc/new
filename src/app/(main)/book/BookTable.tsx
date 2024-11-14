import { Book } from "@prisma/client";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import Link from "next/link";
import { Eye, Trash2, Pencil } from "lucide-react";

interface BookTableProps {
  books: Book[];
}

export default function BookTable({ books }: BookTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Publish Year</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((book, index) => (
          <TableRow key={book.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.description}</TableCell>
            <TableCell>{book.publishYear}</TableCell>
            <TableCell>${book.price.toFixed(2)}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Link 
                  href={`/book/view`}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Eye className="w-4 h-4 text-blue-500" />
                </Link>
                <Link 
                  href={`/book/edit/${book.id}`}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Pencil className="w-4 h-4 text-amber-500" />
                </Link>
                <Link 
                  href={`/book/delete/${book.id}`}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Link>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
