import { Answer } from '../types/Answer';
import { QuestionData } from '../types/QuestionData';
export function processAnswers(answers: Answer[]): QuestionData {
  const result: QuestionData = {};
  const tempRatings: { [key: number]: { [month: string]: number[] } } = {};
  for (const answer of answers) {
    if (answer.question_id === null || !answer.createdAt) continue;
    const questionId = answer.question_id;
    const month = (answer.createdAt.getMonth() + 1).toString().padStart(2, '0');
    if (!tempRatings[questionId]) {
      tempRatings[questionId] = {};
    }
    if (!tempRatings[questionId][month]) {
      tempRatings[questionId][month] = [];
    }
    tempRatings[questionId][month].push(answer.rating);
  }
  for (const questionId in tempRatings) {
    const monthlyRatings: { month: string; Rating: number }[] = [];
    for (let i = 1; i <= 12; i++) {
      const month = i.toString().padStart(2, '0');
      const ratings = tempRatings[questionId][month] || [];
      const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
      const avgRating = ratings.length > 0 ? totalRating / ratings.length : 0;
      monthlyRatings.push({ month, Rating: avgRating });
    }
    result[parseInt(questionId)] = monthlyRatings;
  }
  return result;
}
