'use client';

import { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import {
  createQuestion,
  getQuestionsBySurveyId,
  getSurveyById,
} from '@/lib/actions';
import { Question } from '@/lib/types/Question';
import { Spinner } from './spinner';
import { DeleteQuestion } from './delete-question';
import Link from 'next/link';

export const CreateQuestionForm = () => {
  const [questionText, setQuestionText] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const pathName = usePathname();
  const url = `/surveys/${params.id}/add`;
  const [surveyName, setSurveyName] = useState<string>('');

  const [questions, setQuestions] = useState<Question[] | []>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setSubmitLoading(true);
    setError(null);

    const newQuestion: Question = {
      text: questionText,
      survey_id: +params.id,
      createdAt: new Date(),
    };

    try {
      await createQuestion(newQuestion);
      setQuestionText('');
      fetchQuestions();
    } catch (err) {
      setError('Failed to create question. Please try again.');
      console.error(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = (await getQuestionsBySurveyId(+params.id)) || [];
      setQuestions(res);
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const fetchSurveyName = async () => {
    const surveyDetails = await getSurveyById(+params.id);
    setSurveyName(surveyDetails!.survey_name);
  };

  useEffect(() => {
    fetchQuestions();
    fetchSurveyName();
  }, []);

  return (
    <>
      <Link
        href={`/surveys/${params.id}`}
        className='font-bold text-3xl px-2 pb-[40px] pt-[40px]'
      >
        {surveyName}
      </Link>
      <div className='w-10/12 max-w-[1100px]'>
        {error && <p className='text-red-500'>{error}</p>}
        <form
          onSubmit={handleSubmit}
          className='space-y-4 flex flex-col justify-center my-8'
        >
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder='Add your question here...'
            required
            className='textarea textarea-primary bg-secondary w-full'
          />
          <button type='submit' className='btn btn-primary text-secondary'>
            {submitLoading ? <Spinner /> : 'Submit'}
          </button>
        </form>
      </div>
      <div>
        {pathName === url && (
          <div>
            {questions.map((q) => (
              <h3 key={q.id}>{q.text}</h3>
            ))}
          </div>
        )}
      </div>
      <DeleteQuestion questions={questions} fetchQuestions={fetchQuestions} />
    </>
  );
};
