import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.js";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!values.email) newErrors.email = "Email is required.";
    if (!values.password) newErrors.password = "Password is required.";

    setErrors(newErrors);

    // Stop form submission if there are validation errors
    if (Object.keys(newErrors).length > 0) return;

    // Navigate to spinner page while login request is processing
    navigate("/spinner");

    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      console.log("Login successful");
      navigate("/"); // Redirect to main page after successful login
    } catch (err) {
      console.error(err.message);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: "Invalid email or password.",
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
      <div className="w-full max-w-md bg-zinc-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">
          Login
        </h2>
        {errors.general && (
          <p className="text-red-400 text-sm text-center mb-4">
            {errors.general}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-300"
            >
              Email
            </label>
            <input
              onChange={(event) =>
                setValues((prev) => ({ ...prev, email: event.target.value }))
              }
              type="email"
              id="email"
              placeholder="Enter your email"
              className={`mt-1 block w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-700 text-white ${
                errors.email ? "border-2 border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-300"
            >
              Password
            </label>
            <input
              onChange={(event) =>
                setValues((prev) => ({ ...prev, password: event.target.value }))
              }
              type="password"
              id="password"
              placeholder="Enter your password"
              className={`mt-1 block w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-700 text-white ${
                errors.password ? "border-2 border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-zinc-300 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
