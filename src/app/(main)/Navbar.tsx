import { NavbarStyled } from "@/components/BookstoreTheme";
import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import Link from "next/link";

export default function Navbar() {
  return (
    <NavbarStyled>
      <Link href="/" className="text-2xl font-serif font-bold text-primary">
        BookClub
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/book" className="hover:text-primary transition-colors">
          My Books
        </Link>
        <SearchField />
        <UserButton className="ml-4" />
      </div>
    </NavbarStyled>
  );
}