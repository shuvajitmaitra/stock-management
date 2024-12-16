import { useState } from "react";
import { useStock } from "../context/StockContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { handleUserLogin } = useStock();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 to-teal-500">
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-96 transform transition-all duration-300 ease-in-out hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-300 mb-6">Login</h2>
        <form onSubmit={handleUserLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 mt-2 bg-gray-600 text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Write you email..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full p-3 mt-2 bg-gray-600 text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-8 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          {/* 
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2 leading-tight" />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-blue-500 hover:text-blue-700 transition duration-200">
              Forgot Password?
            </a>
          </div> */}

          <button
            type="submit"
            className={`w-full py-3 bg-blue-600 text-white font-semibold rounded-md transition transform duration-300 ease-in-out hover:scale-105 focus:outline-none ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging In..." : "Log In"}
          </button>
        </form>

        {/* <div className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-blue-500 hover:text-blue-700 transition duration-200">
            Sign Up
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
