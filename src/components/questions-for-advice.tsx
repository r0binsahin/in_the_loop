'use client';

import { getRatingsByQuestionId } from '@/lib/actions';
import { Question } from '@/lib/types/Question';
import { calculateAverageRatingPerQuestion } from '@/lib/utils/calculate-average-rating-per-question';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface QuestionsForAdviceProps {
  questions: Question[];
}

type AverageRatings = { [key: number]: number };

export const QuestionsForAdvice = ({ questions }: QuestionsForAdviceProps) => {
  const [averageRatings, setAverageRatings] = useState<AverageRatings>({});

  useEffect(() => {
    const fetchRatings = async () => {
      const newRatings: AverageRatings = {};

      for (const question of questions) {
        const ratings = await getRatingsByQuestionId(question.id);
        newRatings[question.id] = calculateAverageRatingPerQuestion(
          ratings || []
        );
      }

      setAverageRatings(newRatings);
    };

    fetchRatings();
  }, [questions]);

  return (
    <>
      {questions.map((q) => (
        <div key={q.id}>
          <h3>{q.text}</h3>
          <p>
            {averageRatings[q.id] !== undefined
              ? averageRatings[q.id]
              : 'Loading...'}
          </p>
          {averageRatings[q.id] < 6 ? (
            <Link href={`/advice/${q.id}`}>Get Advice</Link>
          ) : (
            <span>Good enough</span>
          )}
        </div>
      ))}
    </>
  );
};
