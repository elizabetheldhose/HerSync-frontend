import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


export default function Pichart({ monthlyIncome, monthlyExpense }) {
    const pieData = [
  { name: "Income", value: monthlyIncome },
  { name: "Expense", value: monthlyExpense },
];

const COLORS = ["#16a34a", "#dc2626"];



return(
    <div className="bg-white p-6 rounded-xl shadow border mt-6">
  <h3 className="text-lg font-semibold mb-4">
    Income vs Expense (This Month)
  </h3>

  <div className="h-72">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          outerRadius={100}
          label
        >
          {pieData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>

)
}