import { useState } from "react";
import { useTasks } from "../context/TasksContext";
import CreateTaskModal from "./CreateTaskModal";
import API from "../services/api";

export default function TaskTable({taskss = []}) {
  const { fetchTasks } = useTasks();
   const { tasks } = useTasks();
  const [editingTask, setEditingTask] = useState(null);

  const toggleComplete = async (task) => {
    const newStatus =
      task.status === "completed" ? "pending" : "completed";

    await API.put(`/tasks/${task._id}`, { status: newStatus });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };
  console.log("Tasks in TaskTable:", taskss);

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Tasks</h3>

      {taskss.length == 0 || undefined? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-sm text-gray-600">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Due Date</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {taskss.map((task) => (
              <tr
                key={task._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td
                  className={`p-3 font-medium ${
                    task.status === "completed"
                      ? "line-through text-gray-400"
                      : ""
                  }`}
                >
                  {task.title}
                </td>

                <td className="p-3 text-gray-500">
                  {task.dueDate?.split("T")[0]}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      task.priority === "high"
                        ? "bg-red-100 text-red-600"
                        : task.priority === "medium"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>

                <td className="p-3 flex gap-3">

                  {/* Complete */}
                  <button
                    onClick={() => toggleComplete(task)}
                    className="text-green-600 hover:underline"
                  >
                    ✔
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => setEditingTask(task)}
                    className="text-indigo-600 hover:underline"
                  >
                    Edit
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      {editingTask && (
        <CreateTaskModal
          editingTask={editingTask}
          closeModal={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}
