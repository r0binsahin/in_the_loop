'use client';

import { createSurvey, getQuestionsBySurveyId } from '@/lib/actions';
import { Question } from '@/lib/types/Question';
import { Survey } from '@/lib/types/Survey';
import Link from 'next/link';
import { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { Spinner } from './spinner';

interface RenderSurveysProps {
  surveys: Survey[];
}

export const RenderSurveys = ({ surveys }: RenderSurveysProps) => {
  const [showForm, setShowForm] = useState(false);
  const [surveyName, setSurveyName] = useState('');
  const [questionsMap, setQuestionsMap] = useState<Record<number, Question[]>>(
    {}
  );
  const [activeSurveyId, setActiveSurveyId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createSurvey(surveyName);
      setSurveyName('');
      setShowForm(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchQuestions = async (id: number) => {
    try {
      const res = (await getQuestionsBySurveyId(id)) || [];
      return res;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const handleSurvey = async (id: number) => {
    if (activeSurveyId === id) {
      setActiveSurveyId(null);
    } else {
      setIsLoading(true);
      try {
        const result = await fetchQuestions(id);
        setQuestionsMap((prev) => ({
          ...prev,
          [id]: result,
        }));
        setActiveSurveyId(id);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className='h-full pt-6 pb-12 flex flex-col items-center w-full'>
      <h2 className='text-center text-3xl font-bold mb-8'>All Surveys</h2>
      <div className='space-y-5 flex flex-col w-3/4 sm:w-1/2'>
        {surveys.map((survey) => (
          <div
            key={survey.id}
            className='flex flex-col gap-4 border-b border-black pb-4'
          >
            <div className='flex items-center justify-between'>
              <Link href={`/surveys/${survey.id}`}>
                <h1 className='text-xl font-semibold'>{survey.survey_name}</h1>
              </Link>
              <button
                onClick={() => handleSurvey(survey.id!)}
                className='rounded-lg opacity-60 hover:opacity-100 focus:opacity-100 transition mt-2'
              >
                <FaPencilAlt />
              </button>
            </div>

            {activeSurveyId === survey.id && (
              <div className='flex gap-4 justify-center w-full'>
                <ul className=''>
                  <div className='flex gap-4'>
                    <li>
                      <Link
                        href={`/admin/surveys/${survey.id}/result`}
                        className='btn btn-primary text-secondary w-[120px]'
                      >
                        See results
                      </Link>
                    </li>

                    <li>
                      <Link
                        className='btn btn-primary text-secondary w-[120px]'
                        href={`/admin/surveys/${survey.id}/update`}
                      >
                        Edit
                      </Link>
                    </li>
                  </div>
                </ul>
              </div>
            )}
          </div>
        ))}
        <button
          onClick={() => setShowForm(!showForm)}
          className='w-1/2 btn btn-primary text-secondary mx-auto'
        >
          Add Survey
        </button>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className='space-y-2 mt-4 flex flex-col items-center'
          >
            <input
              type='text'
              value={surveyName}
              onChange={(e) => setSurveyName(e.target.value)}
              placeholder='Survey Name'
              required
              className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button
              type='submit'
              className='w-1/2 btn btn-primary text-secondary'
            >
              {isLoading ? <Spinner /> : 'Create Survey'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
