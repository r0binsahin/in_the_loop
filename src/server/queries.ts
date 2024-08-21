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

//needed for ai
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

export const queryGetSurveyRatingsBySurveyId = async (surveyId: number) => {
  try {
    const surveyQuestionsArray = await db
      .select()
      .from(questions)
      .where(eq(questions.survey_id, surveyId));

    const surveyRatings = (
      await Promise.all(
        surveyQuestionsArray.map(async (question) => {
          const rating = await queryGetRatingsByQuestionId(question.id);
          if (!rating) return [];
          return rating;
        })
      )
    ).flat();

    return surveyRatings;
  } catch (error) {
    console.error(error);
  }
};
