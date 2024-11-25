import React from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../../context/taskContext";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; 

const TaskCard = ({ task }) => {
  const { deleteTask, loading } = useTasks();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-task/${task.id}`, { state: task }); 
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-xl p-6 hover:shadow-xl transition duration-300">
 
      <h3 className="text-xl font-bold text-gray-800 mb-2 border-b-2 border-gray-200 pb-2">
        {task.title}
      </h3>

     
      <div className="text-sm text-gray-600 space-y-2">
        <p className="leading-relaxed">{task.description}</p>
        <p className="text-xs font-medium text-gray-500">
          Due: <span className="text-gray-700">{task.dueDate}</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleEdit}
          className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition duration-200"
        >
          <FaEdit className="mr-2" />
          Edit
        </button>
        <button
          onClick={() => {
            if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
              deleteTask(task.id);
            }
          }}
          className={`flex items-center bg-red-500 text-white px-4 py-2 rounded-lg shadow-md ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
          } transition duration-200`}
          disabled={loading}
        >
          <FaTrashAlt className="mr-2" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
