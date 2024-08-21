'use client';

import { useEffect, useRef } from 'react';

interface GaugeProps {
  value: number;
}

export const Gauge = ({ value }: GaugeProps) => {
  const gaugeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gaugeRef.current) {
      const gaugeFill = gaugeRef.current.querySelector(
        '.gauge__fill'
      ) as HTMLDivElement;
      const gaugeCover = gaugeRef.current.querySelector(
        '.gauge__cover'
      ) as HTMLDivElement;

      if (value >= 0 && value <= 10) {
        gaugeFill.style.transform = `rotate(${value / 2 + 0.25}turn)`;
        gaugeCover.textContent = `${Math.round(value * 10)}%`;
      }
    }
    console.log(value);
  }, [value]);

  return (
    <div className='gauge w-full max-w-xs text-[#004033] text-2xl font-roboto'>
      <div className='gauge__body w-full h-0 pb-[50%] bg-[#b4c0be] relative rounded-t-[100%_200%] overflow-hidden'>
        <div className='gauge__fill absolute top-full left-0 w-full h-full bg-[#009578] origin-[center_top] rotate-[0.25turn] transition-transform duration-200 ease-out'></div>
        <div className='gauge__cover w-[75%] h-[150%] bg-white rounded-full absolute top-[25%] left-1/2 transform -translate-x-1/2 flex items-center justify-center pb-[25%] box-border'>
          {Math.round(value * 10)}%
        </div>
      </div>
    </div>
  );
};
