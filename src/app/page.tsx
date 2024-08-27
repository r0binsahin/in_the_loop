import useLeavePageConfirm from '@/lib/utils/use-leave-confirm';
import { Carousel } from '../components';
import { getQuestions } from '../lib/actions';

export default async function Home() {
  const questions = (await getQuestions()) || [];

  return (
    <main className='flex justify-center flex-col max-w-[1100px] mx-auto w-full'>
      <Carousel questions={questions} />
    </main>
  );
}
