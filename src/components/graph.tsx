"use client"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

export type GraphData = {
  month: string
  Rating: number
}
export default function Graph({ data }: { data: GraphData[] }) {
  return (
    <LineChart width={1000} height={600} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" padding={{ left: 30, right: 30 }} />
      <YAxis domain={[0, 10]} ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Rating" stroke="#82CA9D" />
    </LineChart>
  )
}
