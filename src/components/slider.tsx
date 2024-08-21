'use client';

import { useState } from 'react';

export const Slider = () => {
  const [value, setValue] = useState(5);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value));
  };

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
    </div>
  );
};
