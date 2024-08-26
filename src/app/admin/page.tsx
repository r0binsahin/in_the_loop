import Graph from '@/components/graph';
import { QuestionsForAdvice } from '@/components/questions-for-advice';
import { getQuestions } from '@/lib/actions';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';

export default async function Admin() {
  const questions = (await getQuestions()) || [];
  return (
    <main className='flex justify-center flex-col min-h-screen max-w-[1100px] mx-auto w-full'>
      <div className='admin-wrapper'>
        <SignedOut>
          <h1> Admin Page</h1>
          <div className='signed-out'>Please sign in!</div>
          <span className='sign-in-button'>
            <SignInButton />
          </span>
        </SignedOut>
      </div>
      <SignedIn>
        <div className='signed-in'>
          <span className='user-button'>
            <h1>Admin Page</h1>
          </span>
          <div className='render'>
            <Graph />
            <QuestionsForAdvice questions={questions} />
          </div>
        </div>
      </SignedIn>
    </main>
  );
}
