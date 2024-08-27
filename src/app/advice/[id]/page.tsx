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

        const prompt = `Based on a survey conducted in our office, we scored a ${averageRating} out of 10 on this question: "${foundQuestion.text}". How can we improve this? `;

        const supportResponse = await generateAISupport(prompt);
        const formattedResponse = supportResponse.content
          ?.split('\n') // Split by newline to get each line as an array element
          .map((line) => line.replace(/^(\d+\.)/, '\n\n$3')) // Add two newlines before lines starting with numbers
          .join('\n'); // Join them back into a single string
        setAdvice(formattedResponse!);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <main className='w-full px-24'>
      {advice ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{advice}</ReactMarkdown>
      ) : (
        <LoadingSkeleton />
      )}
    </main>
  );
}
