'use client';
import { getRatingsByQuestionId } from '@/lib/actions';
import { Question } from '@/lib/types/Question';
import { calculateAverageRatingPerQuestion } from '@/lib/utils/calculate-average-rating-per-question';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Graph from './graph';
import { GraphData } from './graph';
import { Spinner } from './spinner';
import { usePathname } from 'next/navigation';

type AverageRatings = { [key: number]: number };
type ShowGraphStates = { [key: number]: boolean };

interface QuestionsForAdviceProps {
  questions: Question[];
  graphData: { [key: number]: GraphData[] };
}
export const QuestionsForAdvice = ({
  questions,
  graphData,
}: QuestionsForAdviceProps) => {
  const [averageRatings, setAverageRatings] = useState<AverageRatings>({});
  const [showGraphStates, setShowGraphStates] = useState<ShowGraphStates>({});
  const pathName = usePathname();

  const [isAdminPage, setIsAdminPage] = useState(false);

  useEffect(() => {
    setIsAdminPage(pathName.includes('admin'));
  }, [pathName]);

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

  function roundToOneDecimal(number: number) {
    if (isNaN(number)) {
      return 'No answers yet';
    }

    return Math.round(number * 10) / 10;
  }

  return (
    <div className='flex flex-col gap-5 items-center py-12 w-full'>
      <h3 className='font-bold text-2xl px-2'>Statistics per question</h3>
      {questions.map((q) => (
        <div
          key={q.id}
          className='flex flex-col items-start p-6 border-b border-black gap-3 w-full'
        >
          <h3 className='text-lg font-semibold m-2 text-center w-full'>
            {q.text}
          </h3>
          <div className='flex items-center gap-5 mx-auto'>
            <div className='text-gray-700'>
              {averageRatings[q.id!] !== undefined ? (
                `Average rating: ${roundToOneDecimal(averageRatings[q.id!])}`
              ) : (
                <div className='w-full h-[40px] flex justify-center items-center'>
                  <span className='pr-[20px]'> Average rating: </span>{' '}
                  <Spinner />
                </div>
              )}
            </div>
          </div>
          <div className='flex gap-3 mx-auto'>
            <button
              onClick={() => handleShowGraph(q.id!)}
              className='btn btn-primary text-secondary'
            >
              Show Graph
            </button>

            {averageRatings[q.id!] < 6
              ? isAdminPage && (
                  <button className='btn btn-primary text-secondary'>
                    <Link href={`/admin/advice/${q.id}`} className=''>
                      Get Advice
                    </Link>
                  </button>
                )
              : isAdminPage && (
                  <div className='flex items-center text-green-600 font-bold'>
                    Good enough
                  </div>
                )}
          </div>
          {showGraphStates[q.id!] && <Graph data={graphData[q.id!]} />}
        </div>
      ))}
    </div>
  );
};
