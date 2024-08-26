'use server';

import OpenAI from 'openai';

const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const giveAdvice = async (prompt: string) => {
  const completion = await openAi.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'You are an expert in workplace optimization and employee satisfaction. Provide thoughtful and actionable advice based on science and research with references. Answer with 5 suggestions with numbered  highlighted points, in this format title (add highlighted number on each title), reasoning, action and references and nothing else. I want the response in markdown.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });
  console.log('AI answer', completion.choices[0].message.content);

  return completion.choices[0].message;
};
