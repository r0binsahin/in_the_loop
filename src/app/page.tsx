import { calculateAverageRatingPerQuestion } from '@/utils/calculate-average-rating-per-question';
import * as Components from '../components/index';
import {
  getQuestions,
  getRatingsByQuestionId,
  getSurveyRatings,
} from './actions';
import { calculateAverageRatingPerSurvey } from '@/utils/calculate-average-rating-per-survey';

export default async function Home() {
  const questions = (await getQuestions()) || [];

  const ratings = (await getRatingsByQuestionId(1)) || [];

  const averageRatingForQ1 = calculateAverageRatingPerQuestion(ratings);
  console.log('averageRatingForQ1', averageRatingForQ1);

  const surveyRatings = (await getSurveyRatings(1)) || [];
  const averageRatingForSurvey1 =
    calculateAverageRatingPerSurvey(surveyRatings);

  console.log(averageRatingForSurvey1);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>Survey form page</h1>
      <Components.SurveyForm questions={questions} />
      <Components.Gauge value={0.5} />
    </main>
  );
}
