'use client';

import { useEffect, useRef } from 'react';
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
    <GaugeComponent
      style={{ width: '700px' }}
      arc={{
        subArcs: [
          {
            limit: 20,
            color: '#EA4228',
            showTick: true,
          },
          {
            limit: 40,
            color: '#F58B19',
            showTick: true,
          },
          {
            limit: 60,
            color: '#F5CD19',
            showTick: true,
          },
          {
            limit: 100,
            color: '#5BE12C',
            showTick: true,
          },
        ],
      }}
      value={value * 10}
    />
  );
};
