'use client';
import { useState } from 'react';
import { Carousel, Slider } from './';

import { Question } from '@/lib/types/Question';
import { createAnswer } from '@/lib/actions';
import { Answer } from '@/lib/types/Answer';

interface SurveyFormProps {
  questions: Question[];
}

export const SurveyForm = ({ questions }: SurveyFormProps) => {
  const [answers, setAnswers] = useState<Answer[]>([]);

  const submitAnswers = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (answers.length === 0) console.log('no answers');

      await Promise.all(
        answers.map(async (answer) => {
          await createAnswer(answer);
        })
      );

      /*       console.log('Answers created:', answers.length);
      console.log('Answers:', answers); */
      setAnswers([]);
    } catch (error) {
      console.error('Error creating answers:', error);
    }
  };

  return (
    <>
      <Carousel questions={questions} />
      <button onClick={(e) => submitAnswers(e)}>Submit</button>
    </>
  );
};
