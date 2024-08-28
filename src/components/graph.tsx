'use client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export type GraphData = {
  month: string;
  Rating: number;
};
export default function Graph({ data }: { data: GraphData[] }) {
  return (
    <ResponsiveContainer
      width='100%'
      height={400}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <LineChart data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='month' padding={{ left: 10, right: 10 }} />
        <YAxis domain={[0, 10]} ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey='Rating' stroke='#82CA9D' />
      </LineChart>
    </ResponsiveContainer>
  );
}
