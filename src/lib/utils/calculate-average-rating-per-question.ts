export const calculateAverageRatingPerQuestion = (ratings: number[]) => {
  const sumOfRatings = ratings.reduce((a, b) => a + b, 0);
  const averageOfRatingsPerQuestion = sumOfRatings / ratings.length;
  return averageOfRatingsPerQuestion;
};
