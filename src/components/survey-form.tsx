'use client';

import { Carousel } from './';

import { Question } from '@/lib/types/Question';

interface SurveyFormProps {
  questions: Question[];
}

export const SurveyForm = ({ questions }: SurveyFormProps) => {
  return <Carousel questions={questions} />;
};
