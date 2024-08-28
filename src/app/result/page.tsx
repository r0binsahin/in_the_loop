import { Gauge } from '@/components';

import { QuestionsWithGraph } from '@/components/questions-with-graph';

import {
  getQuestions,
  getSurveyAnswers,
  getSurveyRatings,
} from '@/lib/actions';
import { Answer } from '@/lib/types/Answer';
import { GraphData } from '@/lib/types/GraphData';

import { calculateAverageRatingPerSurvey } from '@/lib/utils/calculate-average-rating-per-survey';
import { processAnswers } from '@/lib/utils/convert-question-data';
import { groupByMonthAndCalculateAverage } from '@/lib/utils/filterDataByMonth';

export default async function Result() {
  const surveyRatings = (await getSurveyRatings(1)) || [];

  const questions = (await getQuestions()) || [];

  const averageRatingForSurvey1 =
    calculateAverageRatingPerSurvey(surveyRatings);

  const surveyAnswers: Answer[] = (await getSurveyAnswers(1)) || [];

  const surveyData: GraphData[] =
    groupByMonthAndCalculateAverage(surveyAnswers);

  const questionData = processAnswers(surveyAnswers);

  return (
    <main className=' w-full flex flex-col justify-center items-center'>
      <Gauge value={averageRatingForSurvey1} />
      <QuestionsWithGraph questions={questions} graphData={questionData} />

      {/*       <QuestionsForAdvice questions={questions} graphData={questionData} /> */}
    </main>
  );
}
