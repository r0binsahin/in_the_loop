'use server';

import {
  queryCreateAnswer,
  queryGetQuestions,
  queryGetRatingsByQuestionId,
  queryGetSurveyRatingsBySurveyId,
} from '@/server/queries';

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

export const createAnswer = async (value: number) => {
  try {
    await queryCreateAnswer(value);
  } catch (error) {
    console.error(error);
  }
};
