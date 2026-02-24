export default function SummaryCards({
  totalTasks,
  completedToday,
  overdue,
  monthlyIncome,
  monthlyExpense,
  balance,
  lastPeriod,
  avgSleep,
}) {
  return (
    
<div className="grid md:grid-cols-3 gap-8">

  <div className="bg-white/80 rounded-3xl p-8 shadow-sm border border-white/40">
    <p className="text-mutedText text-sm">Productivity</p>
    <h2 className="text-4xl font-light mt-2 text-softRose">
      {totalTasks}
    </h2>
    <p className="text-sm mt-1 text-mutedText">
      {completedToday} completed today
    </p>
  </div>

  <div className="bg-white/80 rounded-3xl p-8 shadow-sm border border-white/40">
    <p className="text-mutedText text-sm">Monthly Balance</p>
    <h2 className="text-4xl font-light mt-2 text-lavenderDark">
      ₹{balance}
    </h2>
  </div>

  <div className="bg-white/80 rounded-3xl p-8 shadow-sm border border-white/40">
    <p className="text-mutedText text-sm">Wellness</p>
    <h2 className="text-4xl font-light mt-2 text-softRose">
      {avgSleep} hrs
    </h2>
  </div>

</div>

  );
}
