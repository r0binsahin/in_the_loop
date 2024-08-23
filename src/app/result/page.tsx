import { Gauge } from "@/components";
import { getSurveyRatings } from "@/lib/actions";
import { calculateAverageRatingPerSurvey } from "@/lib/utils/calculate-average-rating-per-survey";

export default async function Result() {
  const surveyRatings = (await getSurveyRatings(1)) || [];
  const averageRatingForSurvey1 =
    calculateAverageRatingPerSurvey(surveyRatings);
  return (
    <main className="flex justify-center">
      <Gauge value={averageRatingForSurvey1} />
    </main>
  );
}
