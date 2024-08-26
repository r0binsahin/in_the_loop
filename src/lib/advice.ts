'use server';

import OpenAI from 'openai';
import { Question } from './types/Question';

const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const giveAdvice = async (prompt: string) => {
  console.log(prompt);
  const completion = await openAi.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'You are an expert in workplace optimization and employee satisfaction. Provide thoughtful and actionable advice based on science and research with references.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });
  console.log('AI answer', completion.choices[0].message);

  return completion.choices[0].message;
};
