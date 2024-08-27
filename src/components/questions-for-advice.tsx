'use client';
import { getRatingsByQuestionId } from '@/lib/actions';
import { Question } from '@/lib/types/Question';
import { calculateAverageRatingPerQuestion } from '@/lib/utils/calculate-average-rating-per-question';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Graph from './graph';
import { GraphData } from './graph';
type AverageRatings = { [key: number]: number };
type ShowGraphStates = { [key: number]: boolean };
export const QuestionsForAdvice = ({
  questions,
  graphData,
}: {
  questions: Question[];
  graphData: { [key: number]: GraphData[] };
}) => {
  const [averageRatings, setAverageRatings] = useState<AverageRatings>({});
  const [showGraphStates, setShowGraphStates] = useState<ShowGraphStates>({});
  useEffect(() => {
    const fetchRatings = async () => {
      const newRatings: AverageRatings = {};
      for (const question of questions) {
        const ratings = await getRatingsByQuestionId(question.id!);
        newRatings[question.id!] = calculateAverageRatingPerQuestion(
          ratings || []
        );
      }
      setAverageRatings(newRatings);
    };
    fetchRatings();
  }, [questions]);
  const handleShowGraph = (questionId: number) => {
    setShowGraphStates((prevStates) => ({
      ...prevStates,
      [questionId]: !prevStates[questionId],
    }));
  };
  return (
    <>
      {questions.map((q) => (
        <div key={q.id}>
          <h3>{q.text}</h3>
          <p>
            {averageRatings[q.id!] !== undefined
              ? averageRatings[q.id!]
              : 'Loading...'}
          </p>
          {averageRatings[q.id!] < 6 ? (
            <Link href={`/advice/${q.id}`}>Get Advice</Link>
          ) : (
            <span>Good enough</span>
          )}
          <button onClick={() => handleShowGraph(q.id!)}>Show Graph</button>
          {showGraphStates[q.id!] && <Graph data={graphData[q.id!]} />}
        </div>
      ))}
    </>
  );
};
