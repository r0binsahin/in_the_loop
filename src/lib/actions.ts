'use server';

import {
  queryCreateAnswer,
  queryCreateQuestion,
  queryCreateSurvey,
  queryGetAllSurveys,
  queryGetQuestions,
  queryGetQuestionsBySurveyId,
  queryGetRatingsByQuestionId,
  queryGetSurveyAnswersBySurveyId,
  queryGetSurveyRatingsBySurveyId,
} from '@/server/queries';
import { Answer } from './types/Answer';
import { giveAdvice } from './advice';
import { Survey } from './types/Survey';
import { Question } from './types/Question';
import { revalidatePath } from 'next/cache';

export const getQuestions = async () => {
  try {
    const surveyQuestions = await queryGetQuestions();
    if (!surveyQuestions) return [];
    return surveyQuestions;
  } catch (error) {
    console.error(error);
  }
};

export const getRatingsByQuestionId = async (questionId: number) => {
  try {
    const ratings = await queryGetRatingsByQuestionId(questionId);

    if (!ratings) return [];

    return ratings;
  } catch (error) {
    console.error(error);
  }
};

export const getSurveyRatings = async (surveyId: number) => {
  try {
    const surveyRatings = await queryGetSurveyRatingsBySurveyId(surveyId);

    if (!surveyRatings) return null;

    return surveyRatings;
  } catch (error) {
    console.error(error);
  }
};

export const createAnswer = async (answer: Answer) => {
  try {
    await queryCreateAnswer(answer);
  } catch (error) {
    console.error(error);
  }
};

export const generateAISupport = async (prompt: string) => {
  const result = await giveAdvice(prompt);
  return result;
};

export const getSurveyAnswers = async (surveyId: number) => {
  try {
    const surveyAnswers = await queryGetSurveyAnswersBySurveyId(surveyId);
    if (!surveyAnswers) return [];
    return surveyAnswers;
  } catch (error) {
    console.error(error);
  }
};

export const createQuestion = async (question: Question) => {
  try {
    await queryCreateQuestion(question);
  } catch (error) {
    console.error(error);
  }
};

export const createSurvey = async (surveyName: string) => {
  try {
    await queryCreateSurvey(surveyName);
    revalidatePath('/surveys');
  } catch (error) {
    console.error(error);
  }
};

export const getAllSurveys = async () => {
  try {
    const surveysArray = await queryGetAllSurveys();
    return surveysArray;
  } catch (error) {
    console.error(error);
  }
};

export const getQuestionsBySurveyId = async (surveyId: number) => {
  try {
    const questionsArray = await queryGetQuestionsBySurveyId(surveyId);
    return questionsArray;
  } catch (error) {
    console.error(error);
  }
};
