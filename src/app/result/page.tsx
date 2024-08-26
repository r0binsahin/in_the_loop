import { Gauge } from "@/components";
import { getSurveyRatings } from "@/lib/actions";
import { calculateAverageRatingPerSurvey } from "@/lib/utils/calculate-average-rating-per-survey";

export default async function Result() {
  const surveyRatings = (await getSurveyRatings(1)) || [];
  const averageRatingForSurvey1 =
    calculateAverageRatingPerSurvey(surveyRatings);
  return (
    <main className="flex justify-center flex-col min-h-screen max-w-[1100px] mx-auto w-full">
      <Gauge value={averageRatingForSurvey1} />
    </main>
  );
}
