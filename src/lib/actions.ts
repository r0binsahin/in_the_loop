"use server"

import {
  queryCreateAnswer,
  queryGetQuestions,
  queryGetRatingsByQuestionId,
  queryGetSurveyAnswersBySurveyId,
  queryGetSurveyRatingsBySurveyId,
} from "@/server/queries"
import { Answer } from "./types/Answer"
import { giveAdvice } from "./advice"

export const getQuestions = async () => {
  try {
    const surveyQuestions = await queryGetQuestions()
    if (!surveyQuestions) return []
    return surveyQuestions
  } catch (error) {
    console.error(error)
  }
}

export const getRatingsByQuestionId = async (questionId: number) => {
  try {
    const ratings = await queryGetRatingsByQuestionId(questionId)

    if (!ratings) return []

    return ratings
  } catch (error) {
    console.error(error)
  }
}

export const getSurveyRatings = async (surveyId: number) => {
  try {
    const surveyRatings = await queryGetSurveyRatingsBySurveyId(surveyId)

    if (!surveyRatings) return null

    return surveyRatings
  } catch (error) {
    console.error(error)
  }
}

export const createAnswer = async (answer: Answer) => {
  try {
    await queryCreateAnswer(answer)
  } catch (error) {
    console.error(error)
  }
}

export const generateAISupport = async (prompt: string) => {
  const result = await giveAdvice(prompt)
  return result
}

export const getSurveyAnswers = async (surveyId: number) => {
  try {
    const surveyAnswers = await queryGetSurveyAnswersBySurveyId(surveyId)
    // if (!surveyAnswers) return null
    return surveyAnswers
  } catch (error) {
    console.error(error)
  }
}
