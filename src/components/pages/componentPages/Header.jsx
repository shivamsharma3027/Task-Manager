import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../context/userContext.jsx";

function Header() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Logging out...");
    await logout();
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 text-white p-6 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-4xl font-extrabold hover:text-indigo-300 transition duration-300"
        >
          Task Manager
        </Link>

        <nav>
          <ul className="flex items-center space-x-8">
            {user && (
              <li className="text-xl font-semibold">
                <span className="text-lg">Welcome, </span>
                <span className="font-bold text-yellow-400">
                  {user.displayName.split(" ")[0].charAt(0).toUpperCase() +
                    user.displayName.split(" ")[0].slice(1)}
                </span>
              </li>
            )}
            <li>
              <button
                onClick={handleLogout}
                className="text-lg font-semibold bg-white text-blue-600 border-2 border-transparent rounded-lg p-2 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105"
              >
                <ArrowRightOnRectangleIcon className="h-6 w-6" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
