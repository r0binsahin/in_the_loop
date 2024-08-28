import { Carousel } from '../components';
import { getQuestionsBySurveyId } from '../lib/actions';

export default async function Home() {
  const questions = (await getQuestionsBySurveyId(1)) || [];

  return (
    <main className='flex justify-center flex-col mx-auto w-full'>
      <Carousel questions={questions} />
    </main>
  );
}
