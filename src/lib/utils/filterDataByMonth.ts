import { Answer } from "../types/Answer"

export function groupByMonthAndCalculateAverage(data: Answer[]) {
  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    month: String(i + 1).padStart(2, "0"),
    total: 0,
    count: 0,
  }))

  data.forEach((item) => {
    const monthIndex = new Date(item.createdAt).getMonth()
    monthlyData[monthIndex].total += item.rating
    monthlyData[monthIndex].count += 1
  })

  const result = monthlyData.map((monthData) => ({
    month: monthData.month,
    Rating: monthData.count === 0 ? 0 : monthData.total / monthData.count,
  }))

  return result
}
