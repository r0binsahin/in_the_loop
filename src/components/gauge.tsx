'use client';

import { lexend } from '@/app/ui';
import dynamic from 'next/dynamic';

const GaugeComponent = dynamic(() => import('react-gauge-component'), {
  ssr: false,
});

interface GaugeProps {
  value: number;
}

export const Gauge = ({ value }: GaugeProps) => {
  return (
    <div
      className={`${lexend.variable} flex justify-center items-center w-full md:w-[50%] mx-auto  border-b-4 border-[#e85d58]`}
    >
      <GaugeComponent
        style={{
          width: '100%',
        }}
        type='semicircle'
        arc={{
          colorArray: ['#e85d58', '#F3B61F', '#399E5A'],
          padding: 0,
          subArcs: [
            {
              limit: 20,
            },
            { limit: 40 },
            { limit: 60 },
          ],
        }}
        pointer={{
          type: 'blob',
          color: '#000000',
          width: 25,
          elastic: true,
        }}
        value={value * 10}
        labels={{
          valueLabel: {
            style: {
              fontSize: '40px',
              fill: '#4A5568',
              fontFamily: 'var(--font-lexend)',
              fontWeight: '700',
              textShadow: 'none',
            },
            formatTextValue: (value: number) => value.toFixed(1) + '%',
          },
        }}
      />
    </div>
  );
};
