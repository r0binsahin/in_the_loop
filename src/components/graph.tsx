'use client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
const data = [
  {
    name: 'Jan',
    Rating: 4,
  },
  {
    name: 'Feb',
    Rating: 6,
  },
  {
    name: 'Mars',
    Rating: 7,
  },
  {
    name: 'April',
    Rating: 4,
  },
  {
    name: 'May',
    Rating: 5,
  },
  {
    name: 'June',
    Rating: 8,
  },
  {
    name: 'July',
    Rating: 9,
  },
  {
    name: 'Aug',
    Rating: 9,
  },
  {
    name: 'Sep',
    Rating: 9,
  },
  {
    name: 'Oct',
    Rating: 9,
  },
  {
    name: 'Nov',
    Rating: 9,
  },
  {
    name: 'Dec',
    Rating: 9,
  },
];
export default function Graph() {
  return (
    <LineChart width={1000} height={600} data={data}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' padding={{ left: 30, right: 30 }} />
      <YAxis domain={[0, 10]} ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
      <Tooltip />
      <Legend />
      <Line type='monotone' dataKey='Rating' stroke='#82CA9D' />
    </LineChart>
  );
}
