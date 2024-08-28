'use server';

import { DisplaySurveyResult } from '@/components';
import { auth } from '@clerk/nextjs/server';

export default async function SurveyResult() {
  auth().protect();
  return <DisplaySurveyResult />;
}
