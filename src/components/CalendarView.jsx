import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTasks } from "../context/TasksContext";

export default function CalendarView({ onDateSelect }) {
  const { tasks } = useTasks();
  const [selectedDate, setSelectedDate] = useState(new Date());


  console.log("All Tasks in CalendarView:", selectedDate)

  const handleChange = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
    console.log(date)
  };

  // Highlight dates that have tasks
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toISOString().split("T")[0];

      const tasksOnDate = tasks.filter(
        (task) =>
          task.dueDate &&
          task.dueDate.split("T")[0] === dateString
      );

      if (tasksOnDate.length > 0) {
        return (
          <div className="mt-1 flex justify-center">
            <span className="h-2 w-2 bg-indigo-500 rounded-full"></span>
          </div>
        );
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
      <Calendar
        onChange={handleChange}
        value={selectedDate}
        tileContent={tileContent}
      />
    </div>
  );
}
