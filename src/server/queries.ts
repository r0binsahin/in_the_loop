import { db } from './db';
import { answers, questions } from './db/schema';
import { eq } from 'drizzle-orm';
export const queryGetQuestions = async () => {
  try {
    const questionArray = await db.select().from(questions);
    return questionArray;
  } catch (error) {
    console.error(error);
  }
};

export const queryGetRatingsByQuestionId = async (questionId: number) => {
  try {
    const answersArray = await db
      .select()
      .from(answers)
      .where(eq(answers.question_id, questionId));

    const ratings = answersArray.map((ans) => ans.rating);

    return ratings;
  } catch (error) {
    console.error(error);
  }
};
