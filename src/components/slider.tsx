'use client';

import { useState } from 'react';

export const Slider = () => {
  const [value, setValue] = useState(1);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value));
  };

  return (
    <div className='slidecontainer'>
      <h1 className='text-2xl font-bold mb-4'>Custom Range Slider</h1>

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
    </div>
  );
};
