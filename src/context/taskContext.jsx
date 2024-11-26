import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./userContext";

const TaskContext = createContext();

const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser(); // Get user from context

  const dummyTasks = [
    {
      id: 1,
      title: "Complete Profile",
      description: "Fill out all the details in your profile settings.",
      dueDate: "2024-11-30", // Example due date
    },
    {
      id: 2,
      title: "Submit Assignment",
      description: "Upload the completed assignment to the portal.",
      dueDate: "2024-12-05",
    },
    {
      id: 3,
      title: "Schedule Meeting",
      description: "Set up a meeting with the project manager.",
      dueDate: "2024-12-02",
    },
  ];

  // Load tasks from localStorage
  const fetchTasks = () => {
    if (!user) return; // Only allow if user is signed in
    setLoading(true);

    try {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      if (storedTasks.length === 0) {
        // Save dummy tasks if no tasks exist
        localStorage.setItem("tasks", JSON.stringify(dummyTasks));
        setTasks(dummyTasks);
      } else {
        setTasks(storedTasks);
      }
    } catch (error) {
      console.error("Error fetching tasks from localStorage:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const addTask = (task) => {
    if (!user) {
      console.warn("User not signed in. Cannot add task.");
      return;
    }

    try {
      const newTask = {
        ...task,
        id: Date.now(), // Unique ID for tasks
        title: capitalizeFirstLetter(task.title),
        description: capitalizeFirstLetter(task.description),
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Update an existing task
  const updateTask = (updatedTask) => {
    if (!user) {
      console.warn("User not signed in. Cannot update task.");
      return;
    }

    try {
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete a task
  const deleteTask = (id) => {
    if (!user) {
      console.warn("User not signed in. Cannot delete task.");
      return;
    }

    try {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Automatically fetch tasks if a user is signed in
  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, loading, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

const useTasks = () => useContext(TaskContext);

export { useTasks, TaskProvider };
