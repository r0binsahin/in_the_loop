'use server';

import { queryGetQuestions } from '@/server/queries';

export const getQuestions = async () => {
  try {
    const surveyQuestions = await queryGetQuestions();
    return surveyQuestions;
  } catch (error) {
    console.error(error);
  }
};
