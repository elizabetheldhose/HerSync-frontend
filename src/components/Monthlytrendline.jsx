

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";


export const Monthlytrendline = ({ monthlyTransactions, currentMonth, currentYear }) => {
const daysInMonth = new Date(
  currentYear,
  currentMonth + 1,
  0
).getDate();

const trendData = Array.from({ length: daysInMonth }, (_, i) => {
  const day = i + 1;

  const dailyExpense = monthlyTransactions
    .filter((t) => {
      const d = new Date(t.date);
      return (
        d.getDate() === day && t.type === "expense"
      );
    })
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    day,
    expense: dailyExpense,
  };
});

    return(
<div className="bg-white p-6 rounded-xl shadow border mt-6">
  <h3 className="text-lg font-semibold mb-4">
    Daily Expense Trend
  </h3>

  <div className="h-72">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={trendData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="expense"
          stroke="#dc2626"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>

    )
}