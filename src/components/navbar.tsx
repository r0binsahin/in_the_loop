'use client';

import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav>
      <Link href='/'>
        <h1>logo</h1>
      </Link>

      <Link href='/admin'>login</Link>
    </nav>
  );
};
