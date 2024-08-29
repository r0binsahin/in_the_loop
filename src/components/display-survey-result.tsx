"use client"

import { Question } from "@/lib/types/Question"
import { Gauge } from "../components"
import { useEffect, useState } from "react"
import {
  getQuestionsBySurveyId,
  getSurveyAnswers,
  getSurveyRatings,
} from "@/lib/actions"
import { useParams } from "next/navigation"
import { QuestionsForAdvice } from "./questions-for-advice"
import { calculateAverageRatingPerSurvey } from "@/lib/utils/calculate-average-rating-per-survey"
import { processAnswers } from "@/lib/utils/convert-question-data"
import { Answer } from "@/lib/types/Answer"

type AverageRatings = { [key: number]: number }
export const DisplaySurveyResult = () => {
  const params = useParams()
  const [surveyRatings, setSurveyRatings] = useState<number[]>([])
  const [surveyAnswers, setSurveyAnswers] = useState<Answer[]>([])
  const [questions, setQuestions] = useState<Question[]>([])

  const averageRatingForSurvey = calculateAverageRatingPerSurvey(surveyRatings)
  const questionData = processAnswers(surveyAnswers)

  const handleData = async () => {
    try {
      const fetchedSurveyRatings = (await getSurveyRatings(+params.id)) || []
      setSurveyRatings(fetchedSurveyRatings)

      const fetchedQuestions = (await getQuestionsBySurveyId(+params.id)) || []
      setQuestions(fetchedQuestions)

      const fetchedSurveyAnswers = (await getSurveyAnswers(+params.id)) || []

      setSurveyAnswers(fetchedSurveyAnswers)
    } catch (error) {
      console.error(error)
    }
  }

  //filter survey answers based on question id and its rating
  //[{ 1: [5, 9, 5] }, { 2: [5, 9, 5] }, { 3: [5, 9, 5] }]
  //[{id: number[]}] -> [id: average rating]

  const result = surveyAnswers.reduce((acc, obj) => {
    const questionId = obj.question_id
    const rating = obj.rating

    const existingQuestion = acc.find((item) => item[questionId!])

    if (existingQuestion) {
      existingQuestion[questionId!].push(rating)
    } else {
      const newEntry = {}
      newEntry[questionId] = [rating]
      acc.push(newEntry)
    }

    return acc
  }, [])

  useEffect(() => {
    handleData()
  }, [])

  return (
    <main className=" w-full flex flex-col justify-center items-center">
      <Gauge value={averageRatingForSurvey} />
      <QuestionsForAdvice
        questions={questions}
        graphData={questionData}
        averageRatings={result}
      />
    </main>
  )
}
