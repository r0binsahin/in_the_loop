"use client";

import { createSurvey, getQuestionsBySurveyId } from "@/lib/actions";
import { Question } from "@/lib/types/Question";
import { Survey } from "@/lib/types/Survey";
import Link from "next/link";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

interface RenderSurveysProps {
  surveys: Survey[];
}

export const RenderSurveys = ({ surveys }: RenderSurveysProps) => {
  const [showForm, setShowForm] = useState(false);
  const [surveyName, setSurveyName] = useState("");
  const [questionsMap, setQuestionsMap] = useState<Record<number, Question[]>>(
    {}
  );
  const [activeSurveyId, setActiveSurveyId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createSurvey(surveyName);

    setSurveyName("");
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
    if (activeSurveyId === id) {
      setActiveSurveyId(null);
    } else {
      const result = await fetchQuestions(id);
      setQuestionsMap((prev) => ({
        ...prev,
        [id]: result,
      }));
      setActiveSurveyId(id);
    }
  };

  return (
    <div className="h-full pt-6 pb-12 flex flex-col items-center w-full">
      <h2 className="text-center text-3xl font-bold mb-8">All Surveys</h2>
      <div className="space-y-5 flex flex-col w-3/4 sm:w-1/2">
        {surveys.map((survey) => (
          <div
            key={survey.id}
            className="flex flex-col gap-4 border-b border-black pb-4"
          >
            <div className="flex items-center justify-between">
              <Link href={`/surveys/${survey.id}`}>
                <h1 className="text-xl font-semibold uppercase">
                  {survey.survey_name}
                </h1>
              </Link>
              <button
                onClick={() => handleSurvey(survey.id!)}
                className="min-h-6 min-w-6 rounded-lg opacity-60 hover:opacity-100 focus:opacity-100 transition mt-2"
              >
                <FaPencilAlt />
              </button>
            </div>

            {activeSurveyId === survey.id && (
              <div className="flex gap-4 justify-center w-full">
                <ul className="">
                  {questionsMap[survey.id]?.length === 0 ? (
                    <li>
                      <Link
                        href={`/surveys/${survey.id}/add`}
                        className="block bg-primary text-white px-3 py-2 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition text-xs sm:text-base"
                      >
                        Add questions
                      </Link>
                    </li>
                  ) : (
                    <div className="flex gap-4">
                      <li>
                        <Link
                          href={`/surveys/${survey.id}/add`}
                          className="block bg-primary text-white px-3 py-2 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition text-sm sm:text-base"
                        >
                          Add questions
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/surveys/${survey.id}/update`}
                          className="block bg-primary text-white px-3 py-2 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition text-sm sm:text-base"
                        >
                          Update survey
                        </Link>
                      </li>
                    </div>
                  )}
                </ul>
              </div>
            )}
          </div>
        ))}
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-1/2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-600 transition font-semibold mx-auto"
        >
          Add Survey
        </button>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="space-y-2 mt-4 flex flex-col items-center"
          >
            <input
              type="text"
              value={surveyName}
              onChange={(e) => setSurveyName(e.target.value)}
              placeholder="Survey Name"
              required
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-1/2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-600 transition font-semibold"
            >
              Create Survey
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
