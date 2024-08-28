"use client"
import { getRatingsByQuestionId } from "@/lib/actions"
import { Question } from "@/lib/types/Question"
import { calculateAverageRatingPerQuestion } from "@/lib/utils/calculate-average-rating-per-question"
import Link from "next/link"
import { useEffect, useState } from "react"
import Graph from "./graph"
import { GraphData } from "./graph"
import { BsChevronRight } from "react-icons/bs"
type AverageRatings = { [key: number]: number }
type ShowGraphStates = { [key: number]: boolean }
export const QuestionsForAdvice = ({
  questions,
  graphData,
}: {
  questions: Question[]
  graphData: { [key: number]: GraphData[] }
}) => {
  const [averageRatings, setAverageRatings] = useState<AverageRatings>({})
  const [showGraphStates, setShowGraphStates] = useState<ShowGraphStates>({})
  useEffect(() => {
    const fetchRatings = async () => {
      const newRatings: AverageRatings = {}
      for (const question of questions) {
        const ratings = await getRatingsByQuestionId(question.id!)
        newRatings[question.id!] = calculateAverageRatingPerQuestion(
          ratings || []
        )
      }
      setAverageRatings(newRatings)
    }
    fetchRatings()
  }, [questions])
  const handleShowGraph = (questionId: number) => {
    setShowGraphStates((prevStates) => ({
      ...prevStates,
      [questionId]: !prevStates[questionId],
    }))
  }
  function roundToOneDecimal(number: number) {
    return Math.round(number * 10) / 10
  }
  return (
    <div className="flex flex-col gap-5">
      {questions.map((q) => (
        <div
          key={q.id}
          className="flex flex-col items-start bg-white shadow-md rounded-lg p-6 border border-gray-200 gap-3 px-2"
        >
          <h3 className="text-lg font-semibold m-2 text-start">{q.text}</h3>
          <div className="flex items-center gap-5">
            <div className="text-gray-700">
              {averageRatings[q.id!] !== undefined
                ? roundToOneDecimal(averageRatings[q.id!])
                : "Loading..."}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleShowGraph(q.id!)}
              className="mt-4 bg-accent text-white py-2 px-4 rounded hover:bg-primary"
            >
              Show Graph
            </button>

            {averageRatings[q.id!] < 6 ? (
              <Link
                href={`/advice/${q.id}`}
                className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary"
              >
                <button className="flex items-center">
                  Get Advice <BsChevronRight />
                </button>
              </Link>
            ) : (
              <div className="flex items-center text-green-600 font-bold mt-5">
                Good enough
              </div>
            )}
          </div>
          {showGraphStates[q.id!] && <Graph data={graphData[q.id!]} />}
        </div>
      ))}
    </div>
  )
}
