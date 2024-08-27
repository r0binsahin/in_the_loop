'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { createQuestion, getQuestionsBySurveyId } from '@/lib/actions';
import { Question } from '@/lib/types/Question';

export const CreateQuestionForm = () => {
  const [questionText, setQuestionText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();

  const [questions, setQuestions] = useState<Question[] | []>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setLoading(true);
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
      /*       router.push(`/surveys/${surveyId}`); // Redirect back to the survey page after submission */
    } catch (err) {
      setError('Failed to create question. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
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

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <>
      <div className='p-4 space-y-4 bg-gray-800 text-white rounded-lg shadow-md'>
        <h2 className='text-xl font-semibold'>Add a New Question</h2>
        {error && <p className='text-red-500'>{error}</p>}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder='Enter your question here...'
            required
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white'
          />
          <button
            type='submit'
            className='bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition'
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Question'}
          </button>
        </form>
      </div>
      <div>
        {questions.map((q) => (
          <h3>{q.text}</h3>
        ))}
      </div>
    </>
  );
};
