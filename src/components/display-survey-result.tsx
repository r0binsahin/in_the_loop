'use client';

import { Question } from '@/lib/types/Question';
import { Carousel, Gauge } from '../components';
import { useEffect, useState } from 'react';
import {
  getQuestions,
  getQuestionsBySurveyId,
  getSurveyAnswers,
  getSurveyRatings,
} from '@/lib/actions';
import { useParams } from 'next/navigation';
import { QuestionsForAdvice } from './questions-for-advice';
import { calculateAverageRatingPerSurvey } from '@/lib/utils/calculate-average-rating-per-survey';
import { processAnswers } from '@/lib/utils/convert-question-data';
import { Answer } from '@/lib/types/Answer';

export const DisplaySurveyResult = () => {
  const params = useParams();
  const [surveyRatings, setSurveyRatings] = useState<number[]>([]);
  const [surveyAnswers, setSurveyAnswers] = useState<Answer[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <main className=' w-full flex flex-col justify-center items-center'>
      <Gauge value={averageRatingForSurvey} />
      <QuestionsForAdvice questions={questions} graphData={questionData} />
    </main>
  );
};
