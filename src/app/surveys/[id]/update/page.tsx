import { CreateQuestionForm } from "@/components";
import { DeleteQuestion } from "@/components/delete-question";

export default async function Update() {
  return (
    <>
      <CreateQuestionForm />
      <DeleteQuestion />
    </>
  );
}
