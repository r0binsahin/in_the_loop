import {
  pgTable,
  serial,
  integer,
  text,
  date,
  real,
} from 'drizzle-orm/pg-core';

export const surveys = pgTable('surveys', {
  id: serial('id').primaryKey(),
  user_amount: integer('user_amount').notNull(),
  date: date('date').notNull(),
});

export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),
  text: text('text').notNull(),
  survey_id: integer('survey_id').references(() => surveys.id),
});

export const answers = pgTable('answers', {
  id: serial('id').primaryKey(),
  rating: real('rating').notNull(),
  question_id: integer('question_id').references(() => questions.id),
});
