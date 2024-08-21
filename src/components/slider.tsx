'use client';

import { answers } from '@/server/db/schema';
import { SetStateAction, useState, MouseEvent } from 'react';

interface SliderProps {
  answers: number[];
  setAnswers: (answers: number[]) => void;
}

export const Slider = ({ setAnswers, answers }: SliderProps) => {
  const [value, setValue] = useState(5);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value));
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAnswers([...answers, value]);
  };
  console.log('answers:', answers);

  return (
    <div className='slidecontainer'>
      <p className='mt-4 mb-2'>Custom range slider:</p>
      <input
        type='range'
        min='1'
        max='10'
        value={value}
        onChange={handleSliderChange}
        className='slider w-full h-4 bg-gray-300 rounded-lg appearance-none cursor-pointer'
      />

      <p className='mt-4'>Current value: {value}</p>
      <button onClick={(e) => handleClick(e)}>next</button>
    </div>
  );
};
