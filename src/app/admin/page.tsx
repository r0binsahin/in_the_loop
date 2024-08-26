import Graph from '@/components/graph';
import { QuestionsForAdvice } from '@/components/questions-for-advice';
import { getQuestions } from '@/lib/actions';

export default async function Admin() {
  const questions = (await getQuestions()) || [];
  return (
    <main className='flex justify-center flex-col min-h-screen max-w-[1100px] mx-auto w-full'>
      <h1>Admin page</h1>
      <Graph />
      <QuestionsForAdvice questions={questions} />
    </main>
  );
}
