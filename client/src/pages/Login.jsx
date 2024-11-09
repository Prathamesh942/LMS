import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = ({ role = "user" }) => {
  const { auth, login, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const res = await axios.post("/api/v1/auth/login", formData);
      login({ accessToken: res.data.accessToken, user: formData.email });
      setLoading(false);
      console.log(res);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div>
        {role == "user" ? (
          <img src="/learn.png" alt="" />
        ) : (
          <img src="/teach.png" alt="" />
        )}
      </div>
      <div className="w-full max-w-md bg-white p-8 rounded-lg ">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Log in to your account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#6D56C8] text-white font-medium rounded-md hover:bg-purple-700 transition duration-300"
          >
            Log in
          </button>
          {error.length > 0 && <span>{error}</span>}
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account? <Link to={`/register/${role}`}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
