'use client';

import { getRatingsByQuestionId } from '@/lib/actions';
import { Question } from '@/lib/types/Question';
import { calculateAverageRatingPerQuestion } from '@/lib/utils/calculate-average-rating-per-question';
import { useEffect, useState } from 'react';

interface QuestionsForAdviceProps {
  questions: Question[];
}

// Define a type for the averageRatings object
type AverageRatings = {
  [key: number]: number;
};

export const QuestionsForAdvice = ({ questions }: QuestionsForAdviceProps) => {
  const [averageRatings, setAverageRatings] = useState<AverageRatings>({});

  useEffect(() => {
    const fetchRatings = async () => {
      const ratingsPromises = questions.map(async (q) => {
        const ratings = await getRatingsByQuestionId(q.id);
        return {
          id: q.id,
          avgRating: calculateAverageRatingPerQuestion(ratings || []),
        };
      });

      const results = await Promise.all(ratingsPromises);
      console.log(results);
      const ratingsObject = results.reduce<AverageRatings>(
        (acc, { id, avgRating }) => {
          acc[id] = avgRating;
          return acc;
        },
        {}
      );

      setAverageRatings(ratingsObject);
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
        </div>
      ))}
    </>
  );
};
