export type Question = {
  id: number;
  text: string;
  survey_id: number | null;
  createdAt?: Date;
};
