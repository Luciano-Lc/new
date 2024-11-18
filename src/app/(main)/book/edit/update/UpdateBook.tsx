"use client";
import { useState } from "react";
import { Book } from "@prisma/client";
import { updateBook } from "./actions";

interface UpdateBookProps {
  book: Book;
}

export default function UpdateBook({ book }: UpdateBookProps) {
  // Rest of your existing component code
}