export const calculateAverageRatingPerSurvey = (surveyRatings: number[]) => {
  const sumOfRatingsOfSurvey = surveyRatings.reduce((a, b) => a + b, 0);
  const averageOfRatingsPerSurvey = sumOfRatingsOfSurvey / surveyRatings.length;

  return averageOfRatingsPerSurvey;
};
