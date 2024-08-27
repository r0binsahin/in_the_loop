import {
  pgTable,
  serial,
  integer,
  text,
  real,
  varchar,
  timestamp,
} from 'drizzle-orm/pg-core';

export const surveys = pgTable('surveys', {
  id: serial('id').primaryKey(),
  survey_name: varchar('survey_name').notNull(),
  user_amount: integer('user_amount').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),
  text: text('text').notNull(),
  survey_id: integer('survey_id').references(() => surveys.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const answers = pgTable('answers', {
  id: serial('id').primaryKey(),
  rating: real('rating').notNull(),
  question_id: integer('question_id').references(() => questions.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
