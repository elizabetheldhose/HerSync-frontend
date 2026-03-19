import { useTasks } from "../context/TasksContext";
import { useFinance } from "../context/FinanceContext";
import { useHealth } from "../context/HealthContext";
import { motion } from "framer-motion";
import { useState, useEffect, memo } from "react";
import LifeScoreRing from "../components/LifeScoreRing";
import SummaryCards from "../components/SummaryCards";
import ChartArea from "../components/ChartArea";
import TaskTable from "../components/TaskTable";
import API from "../services/api";

// ✅ FIX: AI Insight panel as a memoized component to avoid unnecessary re-renders
const AIInsightPanel = memo(function AIInsightPanel({
  tasks,
  transactions,
  entries,
}) {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    // Only fetch if we have health data and haven't fetched yet
    if (entries.length > 0 && !fetched) {
      fetchInsight();
    }
  }, [entries.length]);

  const fetchInsight = async () => {
    setLoading(true);
    try {
      // ✅ FIX: Sends real user data to Gemini AI — not a hardcoded string
      const res = await API.post("/ai/health-insight", {
        entries: entries.slice(0, 10), // last 10 entries for context
      });
      setInsight(res.data.insight);
      setFetched(true);
    } catch (err) {
      setInsight("Log your health data to unlock personalized AI insights.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-white/40">
      <div className="flex items-center justify-between mb-3">
        <p className="text-softRose text-xs md:text-sm">🤖 AI Insight</p>
        {fetched && (
          <button
            onClick={fetchInsight}
            className="text-xs text-mutedText hover:text-softRose transition"
          >
            ↻ Refresh
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-mutedText text-sm">
          <div className="w-4 h-4 rounded-full border-2 border-softRose border-t-transparent animate-spin" />
          Generating your personalized insight...
        </div>
      ) : (
        <p className="text-sm md:text-base text-mutedText leading-relaxed whitespace-pre-line">
          {insight ||
            "Log your health data to unlock personalized AI insights powered by Gemini AI."}
        </p>
      )}
    </div>
  );
});

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
      new Date(t.updatedAt).toLocaleDateString("en-CA") === today,
  ).length;

  const overdue = tasks.filter(
    (t) => new Date(t.dueDate) < new Date() && t.status !== "completed",
  ).length;

  /* ===============================
     FINANCE
  =============================== */
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
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
          entries.reduce((sum, e) => sum + Number(e.sleep || 0), 0) /
          entries.length
        ).toFixed(1)
      : 0;

  const lastPeriod = entries
    .filter((e) => e.period)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  /* ===============================
     LIFE SCORE
  =============================== */
  const lifeScore = Math.max(
    0,
    Math.min(100, completedToday * 10 + avgSleep * 5 - overdue * 5),
  );

  /* ===============================
     RENDER
  =============================== */
  return (
    <div className="space-y-6 md:space-y-10 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl md:text-3xl font-light text-warmText">
          Welcome back 🌸
        </h1>
        <p className="text-sm md:text-base text-mutedText mt-2">
          Here's your life overview today.
        </p>
      </div>

      {/* Life Score Panel */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-r from-white to-rose-50 p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40"
      >
        <p className="text-softRose text-xs md:text-sm mb-2">
          ✨ Your Life Balance Score
        </p>
        <h2 className="text-3xl md:text-5xl font-light text-lavenderDark">
          {lifeScore} / 100
        </h2>
        <p className="text-sm md:text-base text-mutedText mt-3">
          Based on productivity, sleep, and balance.
        </p>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
        {/* Productivity */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border border-white/40"
        >
          <p className="text-mutedText text-xs md:text-sm">Productivity</p>
          <h2 className="text-2xl md:text-4xl font-light mt-3 text-softRose">
            {totalTasks}
          </h2>
          <p className="text-xs md:text-sm mt-2 text-mutedText">
            {completedToday} completed today
          </p>
          <p className="text-xs md:text-sm text-red-400">{overdue} overdue</p>
        </motion.div>

        {/* Finance */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border border-white/40"
        >
          <p className="text-mutedText text-xs md:text-sm">Monthly Balance</p>
          <h2 className="text-2xl md:text-4xl font-light mt-3 text-lavenderDark break-words">
            ₹{balance}
          </h2>
          <p className="text-green-500 text-xs md:text-sm mt-2">
            Income ₹{monthlyIncome}
          </p>
          <p className="text-red-400 text-xs md:text-sm">
            Expense ₹{monthlyExpense}
          </p>
        </motion.div>

        {/* Wellness */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border border-white/40"
        >
          <p className="text-mutedText text-xs md:text-sm">Wellness</p>
          <h2 className="text-2xl md:text-4xl font-light mt-3 text-softRose">
            {avgSleep} hrs
          </h2>
          <p className="text-xs md:text-sm mt-2 text-mutedText">Avg sleep</p>
          <p className="text-xs md:text-sm text-pink-400 break-words">
            Last period:{" "}
            {lastPeriod
              ? new Date(lastPeriod.date).toLocaleDateString()
              : "N/A"}
          </p>
        </motion.div>
      </div>

      {/* ✅ FIX: Real AI insight from Gemini — replaces hardcoded string */}
      <AIInsightPanel
        tasks={tasks}
        transactions={transactions}
        entries={entries}
      />
    </div>
  );
}
