'use server';

import OpenAI from 'openai';

const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const giveAdvice = async () => {
  const completion = await openAi.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      {
        role: 'user',
        content: 'What is 2+2',
      },
    ],
  });
  console.log('AI answer', completion.choices[0].message);

  return completion.choices[0].message;
};
