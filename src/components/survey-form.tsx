'use client';

import { useEffect } from 'react';
import { Carousel } from './';

import { Question } from '@/lib/types/Question';
import { giveAdvice } from '@/lib/advice';
import { generateAISupport } from '@/lib/actions';

interface SurveyFormProps {
  questions: Question[];
}

export const SurveyForm = ({ questions }: SurveyFormProps) => {
  return <Carousel questions={questions} />;
};
