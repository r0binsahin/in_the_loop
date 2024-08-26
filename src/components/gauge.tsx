'use client';

import { lexend } from '@/app/ui';
import dynamic from 'next/dynamic';

const GaugeComponent = dynamic(() => import('react-gauge-component'), {
  ssr: false,
});

interface GaugeProps {
  value: number;
}
//check new branch deployment
export const Gauge = ({ value }: GaugeProps) => {
  return (
    <div className={`${lexend.variable} flex justify-center`}>
      <GaugeComponent
        style={{ width: '80%' }}
        type='semicircle'
        arc={{
          colorArray: ['#e85d58', '#5AC17D'],
          padding: 0.02,
          subArcs: [{ limit: 20 }, { limit: 40 }, { limit: 60 }],
        }}
        pointer={{
          type: 'blob',
          color: '#000000',
          width: 20,
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
