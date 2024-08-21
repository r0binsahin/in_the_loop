'use client';
import { useState } from 'react';
import { Slider } from './';

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
      console.log('HELLO WORLD!');
      if (answers.length === 0) console.log('no answers');

      await Promise.all(
        answers.map(async (answer) => {
          await createAnswer(answer);
        })
      );

      console.log('Answers created:', answers.length);
      console.log('Answers:', answers);
    } catch (error) {
      console.error('Error creating answers:', error);
    }
  };

  return (
    <form onSubmit={submitAnswers}>
      {questions.map((question) => (
        <div key={question.id}>
          <p>{question.text}</p>
          <Slider
            setAnswers={setAnswers}
            answers={answers}
            questionId={question.id}
          />
        </div>
      ))}
      <button type='submit'>Submit</button>
    </form>
  );
};
