import { eq } from "drizzle-orm";

import { Answer } from "@/lib/types/Answer";
import { Question } from "@/lib/types/Question";

import { db } from "./db";
import { answers, questions, surveys } from "./db/schema";

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

export const queryGetAnswersByQuestionId = async (questionId: number) => {
  try {
    const answersArray = await db
      .select()
      .from(answers)
      .where(eq(answers.question_id, questionId));

    return answersArray;
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

export const queryCreateAnswer = async (answer: Answer) => {
  try {
    await db.insert(answers).values(answer);
  } catch (error) {
    console.error(error);
  }
};

export const queryGetSurveyAnswersBySurveyId = async (surveyId: number) => {
  try {
    const surveyQuestionsArray = await db
      .select()
      .from(questions)
      .where(eq(questions.survey_id, surveyId));

    const surveyRatings = (
      await Promise.all(
        surveyQuestionsArray.map(async (question) => {
          const answers = await queryGetAnswersByQuestionId(question.id);
          if (!answers) return [];
          return answers;
        })
      )
    ).flat();

    return surveyRatings;
  } catch (error) {
    console.error(error);
  }
};

export const queryCreateQuestion = async (question: Question) => {
  try {
    await db.insert(questions).values(question);
  } catch (error) {
    console.error(error);
  }
};

export const queryCreateSurvey = async (surveyName: string) => {
  try {
    await db
      .insert(surveys)
      .values({ survey_name: surveyName, user_amount: 0 });
  } catch (error) {
    console.error(error);
  }
};

export const queryGetAllSurveys = async () => {
  try {
    const surveysArray = await db.select().from(surveys);
    return surveysArray;
  } catch (error) {
    console.error(error);
  }
};

export const queryGetQuestionsBySurveyId = async (surveyId: number) => {
  try {
    const surveyQuestionsArray = await db
      .select()
      .from(questions)
      .where(eq(questions.survey_id, surveyId));

    return surveyQuestionsArray;
  } catch (error) {
    console.error(error);
  }
};

export const queryDeleteQuestion = async (id: number) => {
  try {
    await db.transaction(async (tx) => {
      await tx.delete(answers).where(eq(answers.question_id, id));
      await tx.delete(questions).where(eq(questions.id, id));
    });
  } catch (error) {
    console.error("Error deleting question and answers:", error);
    throw error;
  }
};

export const queryGetSurveyById = async (id: number) => {
  const result = await db.select().from(surveys).where(eq(surveys.id, id));
  return result[0];
};
