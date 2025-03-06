import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);
        
    axios.post('http://localhost:3000/login', {
      username: formData.username,
      Password: formData.password
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  };

  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center overflow-hidden relative">
      <div className="moving-shadows absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />

      <div className="form-container p-8 w-full max-w-md relative z-10">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
              placeholder="•••••••••"
              required
            />
          </div>
          <button type="submit" className="btn-3d w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Login
          </button>
          <p className="mt-4 text-sm text-gray-400 text-center">
            <a href="/user/forget-password" className="text-blue-400 hover:underline">
              Forgot Password?
            </a>
          </p>
          <p className="mt-4 text-sm text-gray-400 text-center">
            Don't have an account?
            <a href="/user/register" className="text-blue-400 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
