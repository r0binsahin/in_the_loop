export const calculateAverageRatingPerQuestion = (answers: number[]) => {
  const sumOfRatings = answers.reduce((a, b) => a + b, 0);
  const averageOfRatingsPerQuestion = sumOfRatings / answers.length;
  return averageOfRatingsPerQuestion;
};
