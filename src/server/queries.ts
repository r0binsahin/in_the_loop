import { db } from './db';
import { questions } from './db/schema';

export const queryGetQuestions = async () => {
  try {
    const questionArray = await db.select().from(questions);
    return questionArray;
  } catch (error) {
    console.error(error);
  }
};
