import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import UpdateBook from "@/app/(main)/update/UpdateBook";

export default async function UpdateBookPage({ 
  params 
}: { 
  params: { id: string } 
}) {
   try {
     const book = await prisma.book.findUnique({
       where: { id: params.id },
     });
     
     if (!book) {
       return notFound();
     }

     return (
       <div className="container mx-auto py-8">
         <h1 className="text-2xl font-bold mb-6">Update Book</h1>
         <UpdateBook book={book} />
       </div>
     );
   } catch (error) {
     console.error("Error fetching book:", error);
     return <div>Error loading book</div>;
   }
}