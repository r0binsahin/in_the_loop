'use server';

import { RenderSurveys } from '@/components/render-surveys';
import { getAllSurveys } from '@/lib/actions';
import { auth } from '@clerk/nextjs/server';

export default async function Surveys() {
  auth().protect();
  const surveys = (await getAllSurveys()) || [];
  return <RenderSurveys surveys={surveys} />;
}
