"use client";

import { Question } from "@/lib/types/Question";
import { Carousel } from "../components";
import { useEffect, useState } from "react";
import { getQuestionsBySurveyId } from "@/lib/actions";
import { useParams } from "next/navigation";

export const DisplaySurvey = () => {
  const params = useParams();

  const [questions, setQuestions] = useState<Question[] | []>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = (await getQuestionsBySurveyId(+params.id)) || [];
        if (!res) return [];

        setQuestions(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuestions();
  }, [params.id]);
  return <Carousel questions={questions!} />;
};
