'use client';

import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CgProfile } from 'react-icons/cg';
import { Logo, Salt } from '../components';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const pathname = usePathname();
  const [isAdminPage, setIsAdminPage] = useState(false);

  useEffect(() => {
    setIsAdminPage(pathname.includes('/admin'));
  }, [pathname]);
  return (
    <div className='navbar bg-secondary max-w-[1100px] w-10/12 px-0'>
      <div className='flex justify-between w-full'>
        <Salt />
        <Link href='/'>
          <Logo />
        </Link>
        {isAdminPage ? (
          <div className='x'>
            <SignedOut>
              <SignInButton>
                <span>
                  <CgProfile size={32} />
                </span>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        ) : (
          <Link href='/admin' className='admin-page-link'>
            <CgProfile size={32} />
          </Link>
        )}
      </div>
    </div>
  );
};
