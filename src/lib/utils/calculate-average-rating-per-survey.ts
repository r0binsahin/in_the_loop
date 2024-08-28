export const calculateAverageRatingPerSurvey = (surveyRatings: number[]) => {
  if (surveyRatings.length === 0) return 0;
  if (!surveyRatings.length) return 0;
  const sumOfRatingsOfSurvey = surveyRatings.reduce((a, b) => a + b, 0);
  const averageOfRatingsPerSurvey = sumOfRatingsOfSurvey / surveyRatings.length;

  return averageOfRatingsPerSurvey;
};
