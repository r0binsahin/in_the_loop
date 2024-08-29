'use client';

import { Question } from '@/lib/types/Question';
import { Gauge, ResultSkeleton } from '../components';
import { useEffect, useState } from 'react';
import {
  getQuestionsBySurveyId,
  getSurveyAnswers,
  getSurveyById,
  getSurveyRatings,
} from '@/lib/actions';
import { useParams } from 'next/navigation';
import { QuestionsForAdvice } from './questions-for-advice';
import { calculateAverageRatingPerSurvey } from '@/lib/utils/calculate-average-rating-per-survey';
import { processAnswers } from '@/lib/utils/convert-question-data';
import { Answer } from '@/lib/types/Answer';
import Graph from './graph';
import { groupByMonthAndCalculateAverage } from '@/lib/utils/filterDataByMonth';
import { GraphData } from '@/lib/types/GraphData';

export const DisplaySurveyResult = () => {
  const params = useParams();
  const [surveyRatings, setSurveyRatings] = useState<number[]>([]);
  const [surveyAnswers, setSurveyAnswers] = useState<Answer[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  const [surveyName, setSurveyName] = useState<string>('');

  const averageRatingForSurvey = calculateAverageRatingPerSurvey(surveyRatings);
  const questionData = processAnswers(surveyAnswers);

  const handleData = async () => {
    try {
      const fetchedSurveyRatings = (await getSurveyRatings(+params.id)) || [];
      setSurveyRatings(fetchedSurveyRatings);

      const fetchedQuestions = (await getQuestionsBySurveyId(+params.id)) || [];
      setQuestions(fetchedQuestions);

      const fetchedSurveyAnswers = (await getSurveyAnswers(+params.id)) || [];

      setSurveyAnswers(fetchedSurveyAnswers);

      const surveyDetails = await getSurveyById(+params.id);
      setSurveyName(surveyDetails!.survey_name);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  const surveyData: GraphData[] =
    groupByMonthAndCalculateAverage(surveyAnswers);

  return (
    <main className='max-w-[1100px] w-10/12 flex flex-col justify-center items-center'>
      {averageRatingForSurvey ? (
        <div className='w-full flex flex-col items-center'>
          <h3 className='font-bold text-3xl px-2 pb-[40px] pt-[40px]'>
            {surveyName}
          </h3>
          <Gauge value={averageRatingForSurvey} />
          <div className='w-full flex flex-col  justify-center items-center'>
            <h3 className='font-bold text-2xl px-2 pb-[40px]'>
              Results over time
            </h3>
            <Graph data={surveyData} />
          </div>
          <QuestionsForAdvice questions={questions} graphData={questionData} />{' '}
        </div>
      ) : (
        <ResultSkeleton />
      )}
    </main>
  );
};
