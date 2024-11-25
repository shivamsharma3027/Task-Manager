import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../../context/taskContext";
import { useUser } from "../../../context/userContext";

import TaskCard from "./TaskCard";
import Loading from "../componentPages/Loading.jsx";

function TaskList() {
  const { tasks, deleteTask, fetchTasks, loading } = useTasks();
  const { user } = useUser();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  useEffect(() => {
    if (user && tasks.length === 0) {
      fetchTasks();
    }
  }, [user, tasks.length, fetchTasks]);

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredTasks.length / tasksPerPage)
  ); 

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = (id) => {
    deleteTask(id);

    const newTotalPages = Math.max(
      1,
      Math.ceil(filteredTasks.length / tasksPerPage)
    );
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    } else if (currentPage > 1 && currentTasks.length === 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages)); 
    }
  }, [filteredTasks.length, currentPage, totalPages]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 container mx-auto px-4 py-8">
       
        <div className="flex justify-between items-center mb-6 bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 ease-in-out"
            />
          </div>
          <span className="text-gray-600 font-medium text-xl">
            Total Tasks: {filteredTasks.length}
          </span>
          <button
            onClick={() => navigate("/add-task")}
            className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500 transition duration-300"
          >
            Add New Task
          </button>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentTasks.length > 0 ? (
                currentTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    handleDelete={handleDelete}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-center col-span-full">
                  No tasks found.
                </p>
              )}
            </div>

            {filteredTasks.length > tasksPerPage && (
              <div className="flex justify-between items-center mt-10 bg-white p-4 rounded-xl shadow-md">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-lg font-semibold">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default TaskList;
