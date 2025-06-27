"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/utils/Links";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
export default function Header() {
  const pathname = usePathname();
  return (
    <header>
      <nav className="flex justify-center gap-[10px]">
        {links.map((link) => (
          <Link
            key={link.id}
            className={pathname === link.href ? "bg-orange-700" : ""}
            href={link.href}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <div className="fixed top-1 right-1">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal" className="cursor-pointer justify-end" />
        </SignedOut>
      </div>
    </header>
  );
}
