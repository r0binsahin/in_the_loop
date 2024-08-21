'use client';
import { useState } from 'react';
import { Slider } from './';

import { Question } from '@/lib/types/Question';

interface SurveyFormProps {
  questions: Question[];
}

export const SurveyForm = ({ questions }: SurveyFormProps) => {
  return (
    <form>
      {questions.map((question) => (
        <div key={question.id}>
          <p>{question.text}</p>
          <Slider />
        </div>
      ))}
    </form>
  );
};
