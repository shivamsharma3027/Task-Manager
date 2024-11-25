import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../../context/taskContext";
import Footer from "../componentPages/Footer.jsx";
import Header from "../componentPages/Header.jsx";

function TaskForm() {
  const { addTask } = useTasks();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title || !task.description || !task.dueDate) {
      alert("All fields are required");
      return;
    }

    addTask(task);
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-blue-200 to-purple-100">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl transform transition duration-500 hover:scale-105">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Add New Task
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={task.title}
                onChange={handleChange}
                placeholder="Enter task title"
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Enter task description"
                className="w-full h-24 px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 resize-none"
              />
            </div>

            {/* Due Date Field */}
            <div className="mb-6">
              <label
                htmlFor="dueDate"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-md text-lg font-medium shadow-md hover:shadow-lg transition duration-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-indigo-400"
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TaskForm;
