import { RenderSurveys } from '@/components/render-surveys';
import { getAllSurveys } from '@/lib/actions';

export default async function Surveys() {
  const surveys = (await getAllSurveys()) || [];
  return <RenderSurveys surveys={surveys} />;
}
