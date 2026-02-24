import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useTasks } from "../context/TasksContext";

export default function ChartArea() {
  const { tasks } = useTasks();

  // Generate last 7 days
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      days.push({
        label: date.toLocaleDateString("en-US", { weekday: "short" }),
        fullDate: date.toISOString().split("T")[0],
      });
    }
    return days;
  };

  const last7Days = getLast7Days();

  // Build chart data dynamically
  const data = last7Days.map((day) => {
    const completedCount = tasks.filter(
      (task) =>
        task.status === "completed" &&
        task.updatedAt?.split("T")[0] === day.fullDate
    ).length;

    return {
      day: day.label,
      completed: completedCount,
    };
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
      <p className="text-lg font-semibold text-gray-700 mb-4">
        Weekly Productivity
      </p>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
