import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTasks } from "../../../context/taskContext";
import Footer from "../componentPages/Footer.jsx";
import Header from "../componentPages/Header.jsx";

const EditTask = () => {
  const { state: task } = useLocation(); // Access the task data from state
  const { updateTask } = useTasks();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: task.id,
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(formData); // Sends the updated task to the API
    navigate("/"); // Redirect to task list
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-100">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl transform transition duration-500 hover:scale-105"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Edit Task
          </h2>

          {/* Title Field */}
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
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              placeholder="Update task title"
            />
          </div>

          {/* Description Field */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full h-24 px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 resize-none"
              placeholder="Update task description"
            ></textarea>
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
              value={formData.dueDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
              }
              className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-md text-lg font-medium shadow-md hover:shadow-lg transition duration-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-indigo-400"
          >
            Update Task
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditTask;
