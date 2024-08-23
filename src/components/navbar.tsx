"use client";

import Link from "next/link";

export const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between my-5 py-5">
        <div></div>
        <Link href="/">
          <h1 className="font-black text-accent text-2xl">In the Loop</h1>
        </Link>
        <Link href="/admin">login</Link>
      </nav>
    </div>
  );
};
