'use client';

import {
  generateAISupport,
  getQuestions,
  getRatingsByQuestionId,
} from '@/lib/actions';
import { Question } from '@/lib/types/Question';
import { calculateAverageRatingPerQuestion } from '@/lib/utils/calculate-average-rating-per-question';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
type AverageRatings = { [key: number]: number };

export default function Advice() {
  const params = useParams<{ id: string }>();
  const [question, setQuestion] = useState<Question | null>(null);
  const [averageRatings, setAverageRatings] = useState<AverageRatings>({});
  const [advice, setAdvice] = useState<string | null>(null);

  const prompt = `Based on a survey conducted in our office, we scored a ${averageRatings} out of 10 on this question: ${question?.text}. How can improve this?`;

  useEffect(() => {
    const fetchQuestion = async () => {
      const result = (await getQuestions()) || [];
      const foundQuestion = result.find((q) => q.id === +params.id);
      setQuestion(foundQuestion!);
    };

    fetchQuestion();
  }, []);

  useEffect(() => {
    const fetchRatings = async () => {
      const newRatings: AverageRatings = {};
      const ratings = await getRatingsByQuestionId(+params.id);
      newRatings[+params.id] = calculateAverageRatingPerQuestion(ratings || []);
      setAverageRatings(newRatings);
    };
    fetchRatings();
  }, []);

  useEffect(() => {
    if (question && Object.keys(averageRatings).length > 0) {
      const rating = averageRatings[+params.id];
      const prompt = `Based on a survey conducted in our office, we scored a ${rating} out of 10 on this question: ${question.text}. How can we improve this?`;

      const fetchAdvice = async () => {
        const supportResponse = await generateAISupport(prompt);
        setAdvice(supportResponse.content);
      };

      fetchAdvice();
    }
  }, [question, averageRatings, params.id]);

  console.log(question?.text);
  console.log(averageRatings);
  console.log(advice);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>Ai advice page</h1>
      <p> {advice} </p>
    </main>
  );
}
