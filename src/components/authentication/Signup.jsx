import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.js";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!values.name) newErrors.name = "Name is required.";
    if (!values.email) newErrors.email = "Email is required.";
    if (!values.password) newErrors.password = "Password is required.";
    if (values.password.length < 6)
      newErrors.password = "Password should be at least 6 characters";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return; // Don't proceed if there are errors

    // Navigate to spinner page while signup request is processing
    navigate("/spinner");

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = res.user;

      await updateProfile(user, {
        displayName: values.name,
      });

      await auth.currentUser.reload();
      console.log("Updated user:", auth.currentUser);

      navigate("/"); // Redirect to the main page after signup
    } catch (err) {
      console.error(err.message);
      // Handle errors such as email already in use
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
      <div className="w-full max-w-md bg-zinc-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-300"
            >
              Name
            </label>
            <input
              onChange={(event) =>
                setValues((prev) => ({ ...prev, name: event.target.value }))
              }
              type="text"
              id="name"
              placeholder="Enter your name"
              className={`mt-1 block w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-700 text-white ${
                errors.name ? "border-2 border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>
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
              placeholder="Create a password"
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
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-zinc-300 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
