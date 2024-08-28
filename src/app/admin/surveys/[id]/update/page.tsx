'use server';

import { CreateQuestionForm } from '@/components';
import { DeleteQuestion } from '@/components/delete-question';
import { auth } from '@clerk/nextjs/server';

export default async function Update() {
  auth().protect();
  return (
    <>
      <CreateQuestionForm />
      <DeleteQuestion />
    </>
  );
}
