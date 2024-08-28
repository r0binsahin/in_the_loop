import { useEffect } from 'react';
import { Carousel } from '../components';
import { getQuestionsBySurveyId } from '../lib/actions';
import { redirect } from 'next/navigation';

export default async function Home() {
  const questions = (await getQuestionsBySurveyId(1)) || [];

  redirect('/surveys/1');

  return (
    <main className='flex justify-center flex-col mx-auto w-full'>
      <Carousel questions={questions} />
    </main>
  );
}
