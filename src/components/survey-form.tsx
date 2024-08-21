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

  const submitAnswers = (e: SubmitEvent, questionId: number) => {
    /*     answers.map(async (ans) => await createAnswer(ans.rating)); */
  };

  return (
    <form>
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
