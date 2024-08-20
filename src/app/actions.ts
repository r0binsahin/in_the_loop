'use server';

import { queryGetQuestions } from '@/server/queries';

export const getQuestions = async () => {
  try {
    return await queryGetQuestions();
  } catch (error) {
    console.error(error);
  }
};
