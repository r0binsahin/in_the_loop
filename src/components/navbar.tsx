"use client";

import Link from "next/link";
import { CgProfile } from "react-icons/cg";

export const Navbar = () => {
  return (
    <div className="navbar bg-secondary max-w-[1100px] w-full">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-1 justify-center">
        <Link href="/">
          <h1 className="font-black text-accent text-2xl">In the Loop</h1>
        </Link>
      </div>
      <div className="flex-none">
        <Link href="/admin">
          <CgProfile size={20} />
        </Link>
      </div>
    </div>
  );
};
