"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { createQuestion, getQuestionsBySurveyId } from "@/lib/actions";
import { Question } from "@/lib/types/Question";

export const CreateQuestionForm = () => {
  const [questionText, setQuestionText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const pathName = usePathname();
  const url = `/surveys/${params.id}/add`;

  const [questions, setQuestions] = useState<Question[] | []>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setLoading(true);
    setError(null);

    const newQuestion: Question = {
      text: questionText,
      survey_id: +params.id,
      createdAt: new Date(),
    };

    try {
      await createQuestion(newQuestion);
      setQuestionText("");
      fetchQuestions();
    } catch (err) {
      setError("Failed to create question. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = (await getQuestionsBySurveyId(+params.id)) || [];
      setQuestions(res);
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <>
      <div className="w-10/12">
        {error && <p className="text-red-500">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col justify-center my-8"
        >
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Add your question here..."
            required
            className="textarea textarea-primary bg-secondary w-full"
          />
          <button
            type="submit"
            className="btn btn-primary text-secondary"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Question"}
          </button>
        </form>
      </div>
      <div>
        {pathName === url && (
          <div>
            {questions.map((q) => (
              <h3 key={q.id}>{q.text}</h3>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
