'use client';

import { deleteQuestion, getQuestionsBySurveyId } from '@/lib/actions';
import { Question } from '@/lib/types/Question';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const DeleteQuestion = () => {
  const params = useParams();

  const [questions, setQuestions] = useState<Question[] | []>([]);

  const fetchQuestions = async () => {
    try {
      const result = (await getQuestionsBySurveyId(+params.id)) || [];
      setQuestions(result);
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const deleteQuestionById = async (id: number) => {
    try {
      await deleteQuestion(id);
    } catch (error) {
      console.error(error, 'Could not delete question!');
    }
  };

  const handleDelete = (id: number) => {
    deleteQuestionById(id);
    fetchQuestions();
  };
  return (
    <>
      {questions.map((que) => (
        <div key={que.id}>
          <h3>{que.text}</h3>
          <button onClick={() => handleDelete(que.id!)}>delete</button>
        </div>
      ))}
    </>
  );
};
