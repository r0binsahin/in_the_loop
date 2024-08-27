'use client';

import { createSurvey } from '@/lib/actions';
import { Survey } from '@/lib/types/Survey';
import Link from 'next/link';
import { useState } from 'react';

interface RenderSurveysProps {
  surveys: Survey[];
}

export const RenderSurveys = ({ surveys }: RenderSurveysProps) => {
  const [showForm, setShowForm] = useState(false);
  const [surveyName, setSurveyName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createSurvey(surveyName);

    setSurveyName('');
    setShowForm(false);
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
