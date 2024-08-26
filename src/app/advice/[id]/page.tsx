'use client';

import {
  generateAISupport,
  getQuestions,
  getRatingsByQuestionId,
} from '@/lib/actions';
import { calculateAverageRatingPerQuestion } from '@/lib/utils/calculate-average-rating-per-question';

import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { LoadingSkeleton } from '@/components';

export default function Advice() {
  const params = useParams<{ id: string }>();

  const [advice, setAdvice] = useState<string | null>(null);

  const hasFetchedAdvice = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (hasFetchedAdvice.current) return;

      hasFetchedAdvice.current = true;
      const result = (await getQuestions()) || [];
      const foundQuestion = result.find((q) => q.id === +params.id);

      if (foundQuestion) {
        const ratings = await getRatingsByQuestionId(+params.id);
        const averageRating = calculateAverageRatingPerQuestion(ratings || []);

        const prompt = `Based on a survey conducted in our office, we scored a ${averageRating} out of 10 on this question: "${foundQuestion.text}". How can we improve this?`;

        const supportResponse = await generateAISupport(prompt);
        setAdvice(supportResponse.content);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>AI Advice Page</h1>

      {advice ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{advice}</ReactMarkdown>
      ) : (
        <LoadingSkeleton />
      )}
    </main>
  );
}
