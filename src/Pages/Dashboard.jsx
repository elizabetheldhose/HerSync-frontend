import { useTasks } from "../context/TasksContext";
import { useFinance } from "../context/FinanceContext";
import { useHealth } from "../context/HealthContext";
import { motion } from "framer-motion";
import LifeScoreRing from "../components/LifeScoreRing";
import SummaryCards from "../components/SummaryCards";
import ChartArea from "../components/ChartArea";
import TaskTable from "../components/TaskTable";  

export default function Dashboard() {
  const { tasks = [] } = useTasks();
  const { transactions = [] } = useFinance();
  const { entries = [] } = useHealth();

  const today = new Date().toLocaleDateString("en-CA");

  /* ===============================
     TASKS
  =============================== */

  const totalTasks = tasks.length;

  const completedToday = tasks.filter(
    (t) =>
      t.status === "completed" &&
      new Date(t.updatedAt).toLocaleDateString("en-CA") === today
  ).length;

  const overdue = tasks.filter(
    (t) =>
      new Date(t.dueDate) < new Date() &&
      t.status !== "completed"
  ).length;

  /* ===============================
     FINANCE
  =============================== */

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  });

  const monthlyIncome = monthlyTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const monthlyExpense = monthlyTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const balance = monthlyIncome - monthlyExpense;

  /* ===============================
     HEALTH
  =============================== */

  const avgSleep =
    entries.length > 0
      ? (
          entries.reduce(
            (sum, e) => sum + Number(e.sleep || 0),
            0
          ) / entries.length
        ).toFixed(1)
      : 0;

  const lastPeriod = entries
    .filter((e) => e.period)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  /* ===============================
     LIFE SCORE (Simple Metric)
  =============================== */

  const lifeScore = Math.max(
    0,
    Math.min(
      100,
      completedToday * 10 +
        avgSleep * 5 -
        overdue * 5
    )
  );

  /* ===============================
     RENDER
  =============================== */

  return (
    <div className="space-y-10">

      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-light text-warmText">
          Welcome back 🌸
        </h1>
        <p className="text-mutedText mt-2">
          Here’s your life overview today.
        </p>
      </div>

      {/* Life Score Panel */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-r from-white to-rose-50 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40"
      >
        <p className="text-softRose text-sm mb-2">
          ✨ Your Life Balance Score
        </p>
        <h2 className="text-5xl font-light text-lavenderDark">
          {lifeScore} / 100
        </h2>
        <p className="text-mutedText mt-3">
          Based on productivity, sleep, and balance.
        </p>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-8">

        {/* Productivity */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-white/40"
        >
          <p className="text-mutedText text-sm">
            Productivity
          </p>
          <h2 className="text-4xl font-light mt-3 text-softRose">
            {totalTasks}
          </h2>
          <p className="text-sm mt-2 text-mutedText">
            {completedToday} completed today
          </p>
          <p className="text-sm text-red-400">
            {overdue} overdue
          </p>
        </motion.div>

        {/* Finance */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-white/40"
        >
          <p className="text-mutedText text-sm">
            Monthly Balance
          </p>
          <h2 className="text-4xl font-light mt-3 text-lavenderDark">
            ₹{balance}
          </h2>
          <p className="text-green-500 text-sm mt-2">
            Income ₹{monthlyIncome}
          </p>
          <p className="text-red-400 text-sm">
            Expense ₹{monthlyExpense}
          </p>
        </motion.div>

        {/* Wellness */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-white/40"
        >
          <p className="text-mutedText text-sm">
            Wellness
          </p>
          <h2 className="text-4xl font-light mt-3 text-softRose">
            {avgSleep} hrs
          </h2>
          <p className="text-sm mt-2 text-mutedText">
            Avg sleep
          </p>
          <p className="text-sm text-pink-400">
            Last period:{" "}
            {lastPeriod
              ? new Date(
                  lastPeriod.date
                ).toLocaleDateString()
              : "N/A"}
          </p>
        </motion.div>

      </div>

      {/* AI Insight Section */}
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white/40">
        <p className="text-softRose text-sm mb-3">
          🤖 AI Insight
        </p>
        <p className="text-mutedText leading-relaxed">
          Your productivity is improving this week.
          Consider maintaining consistent sleep to
          enhance focus and energy levels.
        </p>
      </div>

    </div>
  );
}
