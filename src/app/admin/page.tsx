'use server';
import { RenderSurveys } from '@/components';
import Graph, { GraphData } from '@/components/graph';
import { QuestionsForAdvice } from '@/components/questions-for-advice';
import { getAllSurveys, getQuestions, getSurveyAnswers } from '@/lib/actions';
import { Answer } from '@/lib/types/Answer';
import { processAnswers } from '@/lib/utils/convert-question-data';
import { groupByMonthAndCalculateAverage } from '@/lib/utils/filterDataByMonth';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

export default async function Admin() {
  auth().protect();

  const questions = (await getQuestions()) || [];
  const surveys = (await getAllSurveys()) || [];
  const surveyAnswers: Answer[] = (await getSurveyAnswers(1)) || [];
  const surveyData: GraphData[] =
    groupByMonthAndCalculateAverage(surveyAnswers);
  const questionData = processAnswers(surveyAnswers);
  return (
    <main className='flex justify-center flex-col max-w-[1100px] mx-auto w-full'>
      <div className='admin-wrapper'>
        <SignedOut>
          <div className='signed-out'>Please sign in!</div>
          <span className='sign-in-button'>
            <SignInButton />
          </span>
        </SignedOut>
      </div>
      <SignedIn>
        <div className='signed-in'>
          <span className='user-button'></span>
          {/*       <div className='w-full flex justify-center'>
            <Graph data={surveyData} />
          </div> */}

          <RenderSurveys surveys={surveys} />

          {/*    <QuestionsForAdvice questions={questions} graphData={questionData} /> */}
        </div>
      </SignedIn>
    </main>
  );
}
