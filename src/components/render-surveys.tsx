'use client';

import { createSurvey, getQuestionsBySurveyId } from '@/lib/actions';
import { Question } from '@/lib/types/Question';
import { Survey } from '@/lib/types/Survey';
import Link from 'next/link';
import { useState } from 'react';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createSurvey(surveyName);

    setSurveyName('');
    setShowForm(false);
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
    const result = await fetchQuestions(id);
    setQuestionsMap((prev) => ({
      ...prev,
      [id]: result,
    }));
    setActiveSurveyId(id);
  };

  return (
    <div className='p-4 space-y-6'>
      {surveys.map((survey) => (
        <div
          key={survey.id}
          className='bg-gray-800 text-white p-4 rounded-lg shadow-md'
        >
          <Link href={`/surveys/${survey.id}`}>
            <h1 className='text-xl font-semibold'>{survey.survey_name}</h1>
          </Link>
          <button
            onClick={() => handleSurvey(survey.id!)}
            className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mt-2'
          >
            Handle Survey
          </button>

          {activeSurveyId === survey.id && (
            <div>
              {questionsMap[survey.id]?.length === 0 ? (
                <button className='mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition'>
                  Add questions
                </button>
              ) : (
                <button className='mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition'>
                  update survey
                </button>
              )}
            </div>
          )}
        </div>
      ))}

      <button
        onClick={() => setShowForm(!showForm)}
        className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition'
      >
        Add Survey
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className='space-y-4 mt-4'>
          <input
            type='text'
            value={surveyName}
            onChange={(e) => setSurveyName(e.target.value)}
            placeholder='Survey Name'
            required
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            type='submit'
            className='w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition'
          >
            Create Survey
          </button>
        </form>
      )}
    </div>
  );
};
