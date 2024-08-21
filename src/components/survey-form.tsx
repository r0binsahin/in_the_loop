'use client';
import { useState } from 'react';
import { Slider } from './';

import { Question } from '@/lib/types/Question';

interface SurveyFormProps {
  questions: Question[];
}

export const SurveyForm = ({ questions }: SurveyFormProps) => {
  const [answers, setAnswers] = useState<number[]>([]);
  return (
    <form>
      {questions.map((question) => (
        <div key={question.id}>
          <p>{question.text}</p>
          <Slider setAnswers={setAnswers} answers={answers} />
        </div>
      ))}
    </form>
  );
};
