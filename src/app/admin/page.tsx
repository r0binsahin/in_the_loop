'use server';
import Graph, { GraphData } from '@/components/graph';
import { QuestionsForAdvice } from '@/components/questions-for-advice';
import { getQuestions, getSurveyAnswers } from '@/lib/actions';
import { Answer } from '@/lib/types/Answer';
import { processAnswers } from '@/lib/utils/convert-question-data';
import { groupByMonthAndCalculateAverage } from '@/lib/utils/filterDataByMonth';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
export default async function Admin() {
  const questions = (await getQuestions()) || [];
  const surveyAnswers: Answer[] = (await getSurveyAnswers(1)) || [];
  const surveyData: GraphData[] =
    groupByMonthAndCalculateAverage(surveyAnswers);
  const questionData = processAnswers(surveyAnswers);
  return (
    <main className='flex justify-center flex-col min-h-screen max-w-[1100px] mx-auto w-full'>
      <div className='admin-wrapper'>
        <SignedOut>
          <h1> Admin Page</h1>
          <div className='signed-out'>Please sign in!</div>
          <span className='sign-in-button'>
            <SignInButton />
          </span>
        </SignedOut>
      </div>
      <SignedIn>
        <div className='signed-in'>
          <span className='user-button'>
            <h1>Admin Page</h1>
          </span>
          <div className='render'>
            <Graph data={surveyData} />
            <QuestionsForAdvice
              questions={questions}
              graphData={questionData}
            />
          </div>
        </div>
      </SignedIn>
    </main>
  );
}
