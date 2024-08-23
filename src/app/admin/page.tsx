import { QuestionsForAdvice } from '@/components/questions-for-advice';
import { getQuestions } from '@/lib/actions';

export default async function Admin() {
  const questions = (await getQuestions()) || [];
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>Admin page</h1>
      <QuestionsForAdvice questions={questions} />
    </main>
  );
}
