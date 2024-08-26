"use client";

import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { Logo } from "../components";

export const Navbar = () => {
  const pathname = usePathname();
  const isAdminPage = pathname === "/admin";
  return (
    <div className="navbar bg-secondary max-w-[1100px] w-full">
      <div className="flex-none"></div>
      <div className="flex-1 justify-center">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      {isAdminPage ? (
        <div className="x">
          <SignedOut>
            <SignInButton>
              <span>
                <CgProfile size={20} />
              </span>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      ) : (
        <Link href="/admin" className="admin-page-link">
          <CgProfile size={20} />
        </Link>
      )}
    </div>
  );
};
