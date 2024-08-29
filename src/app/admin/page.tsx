'use server';
import { RenderSurveys } from '@/components';

import { getAllSurveys } from '@/lib/actions';

import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

export default async function Admin() {
  auth().protect();

  const surveys = (await getAllSurveys()) || [];

  return (
    <main className='flex justify-center flex-col max-w-[1100px] mx-auto w-full'>
      <div className='admin-wrapper'>
        <SignedOut>
          <div className='signed-out'>Please sign in!</div>
          <span className='sign-in-button'>
            <SignInButton />
          </span>
        </SignedOut>
      </div>
      <SignedIn>
        <div className='signed-in'>
          <span className='user-button'></span>
          <RenderSurveys surveys={surveys} />
        </div>
      </SignedIn>
    </main>
  );
}
