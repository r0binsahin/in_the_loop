'use server';

import { DisplaySurvey } from '@/components/display-survey';
import { auth } from '@clerk/nextjs/server';

export default async function SurveyPage() {
  auth().protect();
  return <DisplaySurvey />;
}
