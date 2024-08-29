import { CreateQuestionForm } from '@/components';
import { auth } from '@clerk/nextjs/server';

export default async function Update() {
  auth().protect();
  return <CreateQuestionForm />;
}
