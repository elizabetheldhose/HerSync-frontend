import { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async (taskData) => {
    const res = await API.post("/tasks", taskData);

    // 🔥 INSTANT UPDATE
    setTasks((prev) => [res.data, ...prev]);

    return res.data;
  };

  const updateTask = async (id, updatedData) => {
    const res = await API.put(`/tasks/${id}`, updatedData);

    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? res.data : task
      )
    );
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);

    setTasks((prev) =>
      prev.filter((task) => task._id !== id)
    );
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        fetchTasks
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);