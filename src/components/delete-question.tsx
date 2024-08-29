'use client';

import { deleteQuestion, getQuestionsBySurveyId } from '@/lib/actions';
import { Question } from '@/lib/types/Question';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import QuestionLoadingSkeleton from './question-loading-skeleton';
import { Spinner } from './spinner';

interface DeleteQuestionProps {
  fetchQuestions: () => void;
  questions: Question[];
}

export const DeleteQuestion = ({
  questions,
  fetchQuestions,
}: DeleteQuestionProps) => {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const deleteQuestionById = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteQuestion(id);
    } catch (error) {
      console.error(error, 'Could not delete question!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    deleteQuestionById(id);
    fetchQuestions();
  };
  return (
    <>
      {questions.length! > 0 ? (
        questions.map((que) => (
          <div
            key={que.id}
            className='w-10/12 max-w-[1100px] mb-8 pb-4 border-b border-primary flex justify-between'
          >
            <h3 className='pr-4'>{que.text}</h3>
            <button
              onClick={() => handleDelete(que.id!)}
              className='btn btn-accent p-1 text-secondary sm:px-8'
            >
              {isLoading ? <Spinner /> : 'Delete'}
            </button>
          </div>
        ))
      ) : (
        <QuestionLoadingSkeleton />
      )}
    </>
  );
};
