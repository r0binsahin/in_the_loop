'use client';

import { Question } from '@/types/Question';

interface SurveyFormProps {
  questions: Question[];
}

export const SurveyForm = ({ questions }: SurveyFormProps) => {
  return (
    <form>
      {questions.map((question) => (
        <div key={question.id}>
          <p>{question.text}</p>
        </div>
      ))}
    </form>
  );
};
