import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useFinance } from "../context/FinanceContext";

export default function FinanceCalendar({ onDateSelect }) {
  const { expenses } = useFinance();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleChange = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toISOString().split("T")[0];

      const dailyExpenses = expenses.filter(
        (exp) =>
          exp.date &&
          exp.date.split("T")[0] === dateString
      );

      if (dailyExpenses.length > 0) {
        return (
          <div className="mt-1 flex justify-center">
            <span className="h-2 w-2 bg-green-500 rounded-full"></span>
          </div>
        );
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <Calendar
        onChange={handleChange}
        value={selectedDate}
        tileContent={tileContent}
      />
    </div>
  );
}
