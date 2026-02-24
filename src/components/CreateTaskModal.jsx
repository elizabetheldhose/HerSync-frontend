import { useEffect, useState } from "react";
import API from "../services/api";


export default function CreateTaskModal({
  closeModal,
  refreshTasks,
  editingTask,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  // 🔥 If editing, preload values
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
      setPriority(editingTask.priority || "medium");
      setDueDate(
        editingTask.dueDate
          ? editingTask.dueDate.split("T")[0]
          : ""
      );
    }
  }, [editingTask]);

    useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSubmit = async () => {
    try {
      if (editingTask) {
        // UPDATE
        await API.put(`/tasks/${editingTask._id}`, {
          title,
          description,
          priority,
          dueDate,
        });
      } else {
        // CREATE
        await API.post("/tasks", {
          title,
          description,
          priority,
          dueDate,
        });
      }

     
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={closeModal} // click outside closes
    >
   
      <div
        className="bg-white w-[420px] rounded-2xl shadow-xl p-6 animate-fadeIn"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <h3 className="text-lg font-semibold mb-4">
          {editingTask ? "Edit Task" : "Create Task"}
        </h3>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            {editingTask ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
