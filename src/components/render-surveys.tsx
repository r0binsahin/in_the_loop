'use client';

import { Survey } from '@/lib/types/Survey';

interface RenderSurveysProps {
  surveys: Survey[];
}

export const RenderSurveys = ({ surveys }: RenderSurveysProps) => {
  return (
    <>
      {surveys.map((survey) => (
        <div>
          <h1>{survey.survey_name}</h1>
        </div>
      ))}
    </>
  );
};
