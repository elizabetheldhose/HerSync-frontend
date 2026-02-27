import { useState, useMemo } from "react";
import { useTasks } from "../context/TasksContext";
import CreateTaskModal from "../components/CreateTaskModal";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function TasksPage() {
  const { tasks = [] , updateTask ,deleteTask} = useTasks();

  const [view, setView] = useState("table");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);


  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // ===== Date Formatting (timezone safe) =====
  const formatLocalDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // ===== Filter Logic =====
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const taskDate = formatLocalDate(task.dueDate);

      if (fromDate && taskDate < fromDate) return false;
      if (toDate && taskDate > toDate) return false;

      return true;
    });
  }, [tasks, fromDate, toDate]);

  const toggleTaskStatus = async (task) => {
  const newStatus =
    task.status === "completed" ? "pending" : "completed";

  await updateTask(task._id, {
    ...task,
    status: newStatus,
  });
};

  // ===== Quick Filters =====
  const today = formatLocalDate(new Date());

  const setTodayFilter = () => {
    setFromDate(today);
    setToDate(today);
  };

  const setWeekFilter = () => {
    const now = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);

    setFromDate(formatLocalDate(weekAgo));
    setToDate(formatLocalDate(now));
  };

  const setMonthFilter = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    setFromDate(formatLocalDate(firstDay));
    setToDate(formatLocalDate(lastDay));
  };

  const resetFilters = () => {
    setFromDate("");
    setToDate("");
  };

  // ===== Calendar task dates =====
  const taskDates = filteredTasks.map((task) =>
    formatLocalDate(task.dueDate)
  );

  const selectedDateTasks = selectedDate
    ? filteredTasks.filter(
        (task) =>
          formatLocalDate(task.dueDate) ===
          formatLocalDate(selectedDate)
      )
    : [];


    const totalTasks = tasks?.length || 0;

  const completedToday = tasks?.filter(
    (t) =>
      t.status === "completed" &&
      formatLocalDate(t.updatedAt) === today
  ).length;

  const overdue = tasks?.filter(
    (t) =>
      new Date(t.dueDate) < new Date() &&
      t.status !== "completed"
  ).length;

  const completionRate =
    totalTasks > 0
      ? Math.round(
          (tasks.filter((t) => t.status === "completed").length /
            totalTasks) *
            100
        )
      : 0;


      const handleDelete = async (task) => {
     
          await deleteTask(task._id);
        
      }

      console.log("Filtered Tasks:", selectedTask);
  return (
    <div className="space-y-6 md:space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-800">
          Productivity Hub
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-500 transition shadow"
        >
          + Add Task
        </button>
      </div>
      {/* ===== Summary Strip ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

        <div className="bg-white p-4 md:p-6 rounded-2xl shadow border">
          <p className="text-2xl md:text-3xl text-gray-500">Total Tasks</p>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            {totalTasks}
          </p>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-2xl shadow borde">
          <p className="text-2xl md:text-3xl text-gray-500">Completed Today</p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">
            {completedToday}
          </p>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-2xl shadow borde">
          <p className="text-2xl md:text-3xl text-gray-500">Overdue</p>
          <p className="text-3xl font-bold text-rose-500 mt-2">
            {overdue}
          </p>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-2xl shadow borde">
          <p className="text-2xl md:text-3xl text-gray-500">Completion Rate</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {completionRate}%
          </p>
        </div>

      </div>
      {/* ================= FILTER SECTION ================= */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow border space-y-4">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <div>
            <label className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-200">
              From
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-200">
              To
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <button
            onClick={resetFilters}
            className="w-full sm:w-auto bg-gray-200 px-4 py-2 rounded-xl"
          >
            Reset
          </button>

        </div>

        {/* Quick Filters */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={setTodayFilter}
            className="px-4 py-2 rounded-xl bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition"
          >
            Today
          </button>

          <button
            onClick={setWeekFilter}
            className="px-4 py-2 rounded-xl bg-purple-100 text-purple-600 hover:bg-purple-200 transition"
          >
            Last 7 Days
          </button>

          <button
            onClick={setMonthFilter}
            className="px-4 py-2 rounded-xl bg-pink-100 text-pink-600 hover:bg-pink-200 transition"
          >
            This Month
          </button>
        </div>

      </div>

      {/* ================= VIEW TOGGLE ================= */}
      <div className="flex gap-4flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setView("table")}
          className={`px-4 py-2 rounded-xl ${
            view === "table"
              ? "bg-indigo-100 text-indigo-600"
              : "bg-white border"
          }`}
        >
          Table View
        </button>

        <button
          onClick={() => setView("calendar")}
          className={`w-full sm:w-auto px-4 py-2 rounded-xl ${
            view === "calendar"
              ? "bg-indigo-100 text-indigo-600"
              : "bg-white border"
          }`}
        >
          Calendar View
        </button>
      </div>

      {/* ================= TABLE VIEW ================= */}
      {view === "table" && (
        <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
          {filteredTasks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No tasks in selected range.
            </p>
          ) : (
            <ul className="space-y-4">
              {filteredTasks.map((task) => (
                <li
        key={task._id}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between 
           gap-3 border p-4 rounded-xl hover:bg-gray-50 transition"
      >
        <div className="flex flex-wrap items-center gap-3">

          {/* Toggle Button */}

          <button
          onClick={() => {
            setSelectedTask(task);
            setShowModal(true);
          }}
          className="text-indigo-500 hover:text-indigo-700 text-sm"
        >
          ✏️

        </button>

          <button
          onClick={() => {
            setSelectedTask(task);
            handleDelete(task);
          }}
          className="text-indigo-500 hover:text-indigo-700 text-sm"
        >
          🗑️

        </button>
          <button
            onClick={() => toggleTaskStatus(task)}
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
              task.status === "completed"
                ? "bg-emerald-500 border-emerald-500"
                : "border-gray-400"
            }`}
          >
            {task.status === "completed" && (
              <span className="text-white text-xs">✓</span>
            )}
          </button>

          {/* Task Info */}
          <div>
            <p
              className={`font-medium ${
                task.status === "completed"
                  ? "line-through text-gray-400"
                  : ""
              }`}
            >
              {task.title}
            </p>
            <p className="text-sm text-gray-500">
              Due: {formatLocalDate(task.dueDate)}
            </p>
          </div>

        </div>

        <span
          className={`px-3 py-1 text-xs rounded-full ${
            task.status === "completed"
              ? "bg-emerald-100 text-emerald-600"
              : "bg-indigo-100 text-indigo-600"
          }`}
        >
          {task.status}
        </span>
      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

      {/* ================= CALENDAR VIEW ================= */}
      {view === "calendar" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 space-y-6 md:space-y-8 overflow-x-hidden">

          <div className="bg-white p-6 rounded-2xl shadow border border-indigo-100">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={{
                hasTask: (date) =>
                  taskDates.includes(formatLocalDate(date)),
              }}
              modifiersClassNames={{
                hasTask:
                  "bg-indigo-500 text-white rounded-full",
              }}
            />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">
              {selectedDate
                ? `Tasks for ${selectedDate.toLocaleDateString()}`
                : "Select a date"}
            </h3>

            {selectedDateTasks.length === 0 && selectedDate && (
              <p className="text-gray-500">
                No tasks on this day.
              </p>
            )}

            {selectedDateTasks.length > 0 && (
              <ul className="space-y-3">
                {selectedDateTasks.map((task) => (

                  <div className="flex items-center gap-4 border p-3 rounded-lg">

                      <button
          onClick={() => {
            setSelectedTask(task);
            setShowModal(true);
          }}
          className="text-indigo-500 hover:text-indigo-700 text-sm"
        >
          ✏️

        </button>

          <button
          onClick={() => {
            setSelectedTask(task);
            handleDelete(task);
          }}
          className="text-indigo-500 hover:text-indigo-700 text-sm "
        >
          🗑️

        </button>
          <button
            onClick={() => toggleTaskStatus(task)}
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
              task.status === "completed"
                ? "bg-emerald-500 border-emerald-500"
                : "border-gray-400"
            }`}
          >
            {task.status === "completed" && (
              <span className="text-white text-xs">✓</span>
            )}
          </button>
                  <li
                    key={task._id}
                    
                  >
                    {task.title}
                  </li>
                  </div>
                 
                ))}
              </ul>
            )}
          </div>

        </div>
      )}

      {/* Modal */}
      {showModal && (
        <CreateTaskModal
          closeModal={() => setShowModal(false)}
          defaultDate={selectedDate}
          selectedTask={selectedTask}

        />
      )}

    </div>
  );
}
