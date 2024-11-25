import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/api.js"; 
import { useUser } from "./userContext"; 


const TaskContext = createContext();


const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser(); 

  // Fetch tasks from the API
  const fetchTasks = async () => {
    setLoading(true);
  
    try {
      const response = await API.get('/tasks'); 
      setTasks(response.data); 
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false); 
    }
  };

  
  const addTask = async (task) => {
    try {
     
      const newTask = {
        ...task,
        title: capitalizeFirstLetter(task.title),
        description: capitalizeFirstLetter(task.description),
      };

      const response = await API.post('/tasks', newTask);
      setTasks((prev) => [...prev, response.data]); 
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  
  const updateTask = async (updatedTask) => {
    try {
      const response = await API.put(`/tasks/${updatedTask.id}`, updatedTask);
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? response.data : task)) 
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id)); 
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };


  useEffect(() => {
    if (user && tasks.length === 0) { 
      fetchTasks();
    }
  }, [user, tasks.length]); 

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, loading, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

const useTasks = () => useContext(TaskContext);

export { useTasks, TaskProvider };
