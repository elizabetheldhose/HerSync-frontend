import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useFinance } from "../context/FinanceContext";
import Pichart from "../components/PieChart";
import { Monthlytrendline } from "../components/Monthlytrendline";
import "react-calendar/dist/Calendar.css";


export default function FinancePage() {
  const { transactions, addTransaction, deleteTransaction } = useFinance();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const selectedDateString =
selectedDate.toLocaleDateString("en-CA")

    console.log("transactions", transactions);
  // Filter transactions for selected date
  const dailyTransactions = transactions.filter(
    (t) =>
      t.date &&
      t.date.split("T")[0] === selectedDateString
  );

  // Calculate totals
  const dailyIncome = dailyTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const dailyExpense = dailyTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const dailyBalance = dailyIncome - dailyExpense;

  const handleSubmit = async (e) => {
    e.preventDefault();


    console.log("selectedDateString",selectedDateString)
    await addTransaction({
      type,
      amount,
      category,
      note,
      date: selectedDateString,
    });

    setAmount("");
    setCategory("");
    setNote("");
  };

  // Calendar dot indicator
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toISOString().split("T")[0];

      const hasTransaction = transactions.some(
        (t) =>
          t.date &&
          t.date.split("T")[0] === dateString
      );

      if (hasTransaction) {
        return (
           <div className="mt-1 flex justify-center">
    <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full"></span>
  </div>
        );
      }
    }
  };


  const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const monthlyTransactions = transactions.filter((t) => {

  const date = new Date(t.date);
  return (
    date.getMonth() === currentMonth &&
    date.getFullYear() === currentYear
  );
});

console.log("monthlyTransactions",monthlyTransactions)

const monthlyIncome = monthlyTransactions.reduce((sum, t) => {
  if (t.type === "income") {
    return sum + Number(t.amount || 0);
  }
  return sum;
}, 0);


const monthlyExpense = monthlyTransactions
  .filter((t) => t.type === "expense")
  .reduce((sum, t) => sum + t.amount, 0);

const monthlyBalance = monthlyIncome - monthlyExpense;

 return (
  <div className="space-y-8">

    {/* Header */}
    <div>
      <h1 className="text-3xl font-bold text-slate-800">
        Personal Finance
      </h1>
      <p className="text-slate-500 mt-1">
        Track income, expenses and manage your monthly balance
      </p>
    </div>

    {/* Monthly Summary Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <p className="text-sm text-slate-500">Monthly Income</p>
        <p className="text-3xl font-bold text-emerald-600 mt-2">
          ₹{monthlyIncome}
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <p className="text-sm text-slate-500">Monthly Expense</p>
        <p className="text-3xl font-bold text-rose-600 mt-2">
          ₹{monthlyExpense}
        </p>
      </div>

      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-2xl shadow-sm">
        <p className="text-sm opacity-80">Net Balance</p>
        <p className="text-3xl font-bold mt-2">
          ₹{monthlyBalance}
        </p>
      </div>

    </div>

    {/* Charts Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <Pichart
          monthlyIncome={monthlyIncome}
          monthlyExpense={monthlyExpense}
        />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <Monthlytrendline
          monthlyTransactions={monthlyTransactions}
          currentMonth={currentMonth}
          currentYear={currentYear}
        />
      </div>
    </div>

    {/* Calendar + Transactions */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Calendar Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={tileContent}
        />
      </div>

      {/* Right Panel */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">

        <h3 className="text-lg font-semibold text-slate-700">
          {selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h3>

        {/* Daily Summary */}
        <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl">

          <div>
            <p className="text-xs text-slate-500">Income</p>
            <p className="text-lg font-semibold text-emerald-600">
              ₹{dailyIncome}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Expense</p>
            <p className="text-lg font-semibold text-rose-600">
              ₹{dailyExpense}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Balance</p>
            <p className="text-lg font-semibold text-slate-800">
              ₹{dailyBalance}
            </p>
          </div>

        </div>

        {/* Add Transaction */}
        <form
          onSubmit={handleSubmit}
          className="space-y-3 bg-slate-50 p-4 rounded-xl"
        >

          <div className="flex gap-3">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="flex-1 border border-slate-200 p-2 rounded-lg"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) =>
                setAmount(Number(e.target.value))
              }
              className="flex-1 border border-slate-200 p-2 rounded-lg"
              required
            />
          </div>

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-slate-200 p-2 rounded-lg"
            required
          />

          <input
            type="text"
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border border-slate-200 p-2 rounded-lg"
          />

          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition font-medium">
            Add Transaction
          </button>

        </form>

        {/* Transactions List */}
        <div className="space-y-3">

          {dailyTransactions.length === 0 && (
            <p className="text-slate-400">
              No transactions for this date.
            </p>
          )}

          {dailyTransactions.map((t) => (
            <div
              key={t._id}
              className="flex justify-between items-center bg-white border border-slate-100 hover:shadow-sm transition p-3 rounded-xl"
            >
              <div>
                <p
                  className={`font-semibold ${
                    t.type === "income"
                      ? "text-emerald-600"
                      : "text-rose-600"
                  }`}
                >
                  ₹{t.amount} • {t.category}
                </p>
                <p className="text-sm text-slate-500">
                  {t.note}
                </p>
              </div>

              <button
                onClick={() =>
                  deleteTransaction(t._id)
                }
                className="text-rose-500 hover:text-rose-700 text-sm"
              >
                Delete
              </button>
            </div>
          ))}

        </div>

      </div>

    </div>

  </div>
);

}
