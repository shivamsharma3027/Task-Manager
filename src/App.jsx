import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/authentication/Login.jsx";
import Signup from "./components/authentication/Signup.jsx";
import Home from "./components/pages/componentPages/Home.jsx";

import EditTask from "./components/pages/TasksPages/EditTask.jsx";
import TaskForm from "./components/pages/TasksPages/TaskForm.jsx";
import { TaskProvider } from "./context/taskContext.jsx";

function App() {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-task" element={<TaskForm />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
       
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;
