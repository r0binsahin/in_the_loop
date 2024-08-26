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

export const Navbar = () => {
  const pathname = usePathname();
  const isAdminPage = pathname === '/admin';
  return (
    <div className='navbar bg-secondary max-w-[1100px] w-full'>
      <div className='flex-none'></div>
      <div className='flex-1 justify-center'>
        <Link href='/'>
          <h1 className='font-black text-accent text-2xl'>In the Loop</h1>
        </Link>
      </div>

      {isAdminPage ? (
        <div className='login-btn-wrapper'>
          <SignedOut>
            <SignInButton>
              <span className='border-2 border-black px-4 rounded-lg text-base cursor-pointer font-normal'>
                <CgProfile size={20} />
              </span>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      ) : (
        <Link href='/admin' className='admin-page-link'>
          <CgProfile size={20} />
        </Link>
      )}
    </div>
  );
};
