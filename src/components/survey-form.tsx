'use client';

import { useEffect } from 'react';
import { Carousel } from './';

import { Question } from '@/lib/types/Question';
import { giveAdvice } from '@/lib/advice';

interface SurveyFormProps {
  questions: Question[];
}

export const SurveyForm = ({ questions }: SurveyFormProps) => {
  useEffect(() => {
    const fetchRes = async () => {
      const result = await giveAdvice();
      console.log('ai res:', result.content);

      return result;
    };

    fetchRes();
  }, []);
  return <Carousel questions={questions} />;
};
