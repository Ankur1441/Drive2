import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    console.log("Reset link sent to:", email);
    // Implement API call here
  };

  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center overflow-hidden relative">
      <div className="moving-shadows absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 animate-pulse"></div>
      <div className="form-container p-8 w-full max-w-md relative z-10 rounded-lg shadow-xl bg-opacity-90 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Forgot Password</h2>
        <p className="text-sm text-gray-400 mb-6 text-center">
          Enter your email address, and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>
          <button type="submit" className="btn-3d w-full text-white font-medium rounded-lg text-sm px-5 py-2.5">
            Send Reset Link
          </button>
          <p className="mt-4 text-sm text-gray-400 text-center">
            Remember your password? <a href="/user/login" className="text-blue-400 hover:underline">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
