import * as Components from '../components/index';
import { getQuestions } from './actions';

export default async function Home() {
  const questions = (await getQuestions()) || [];
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>Survey form page</h1>
      <Components.SurveyForm questions={questions} />
      <Components.Gauge value={0.5} />
    </main>
  );
}
