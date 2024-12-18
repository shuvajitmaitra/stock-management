import { useState } from "react";

export default function SignUpCom() {
  const [signUp, setSignUp] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your sign-up logic here
    if (signUp.password !== signUp.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-gray-800 to-teal-500">
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-96 transform transition-all duration-300 ease-in-out hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-300 mb-6">Create your account</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name Field */}
          <div className="relative w-full rounded-lg">
            <input
              className="w-full peer rounded-lg border border-sky-600 bg-transparent px-4 py-2 text-sky-600 focus:outline-none"
              type="text"
              id="fullName"
              value={signUp.fullName}
              onChange={(e) => setSignUp((prev) => ({ ...prev, fullName: e.target.value }))}
              placeholder=" "
              required
            />
            <label
              className="absolute -top-2 left-2 rounded-md bg-sky-600 px-2 text-xs text-sky-100 duration-300 
                         peer-placeholder-shown:top-3 
                         peer-placeholder-shown:bg-transparent 
                         peer-placeholder-shown:text-sm 
                         peer-placeholder-shown:text-zinc-400 
                         peer-focus:-top-2 
                         peer-focus:bg-sky-600 
                         peer-focus:text-xs 
                         peer-focus:text-sky-100"
              htmlFor="fullName"
            >
              Full Name
            </label>
          </div>

          {/* Email Field */}
          <div className="relative w-full rounded-lg">
            <input
              className="w-full peer rounded-lg border border-sky-600 bg-transparent px-4 py-2 text-sky-600 focus:outline-none"
              type="email"
              id="email"
              value={signUp.email}
              onChange={(e) => setSignUp((prev) => ({ ...prev, email: e.target.value }))}
              placeholder=" "
              required
            />
            <label
              className="absolute -top-2 left-2 rounded-md bg-sky-600 px-2 text-xs text-sky-100 duration-300 
                         peer-placeholder-shown:top-3 
                         peer-placeholder-shown:bg-transparent 
                         peer-placeholder-shown:text-sm 
                         peer-placeholder-shown:text-zinc-400 
                         peer-focus:-top-2 
                         peer-focus:bg-sky-600 
                         peer-focus:text-xs 
                         peer-focus:text-sky-100"
              htmlFor="email"
            >
              Email
            </label>
          </div>

          {/* Password Field */}
          <div className="relative w-full rounded-lg">
            <input
              className="w-full peer rounded-lg border border-sky-600 bg-transparent px-4 py-2 text-sky-600 focus:outline-none"
              type="password"
              id="password"
              value={signUp.password}
              onChange={(e) => setSignUp((prev) => ({ ...prev, password: e.target.value }))}
              placeholder=" "
              required
            />
            <label
              className="absolute -top-2 left-2 rounded-md bg-sky-600 px-2 text-xs text-sky-100 duration-300 
                         peer-placeholder-shown:top-3 
                         peer-placeholder-shown:bg-transparent 
                         peer-placeholder-shown:text-sm 
                         peer-placeholder-shown:text-zinc-400 
                         peer-focus:-top-2 
                         peer-focus:bg-sky-600 
                         peer-focus:text-xs 
                         peer-focus:text-sky-100"
              htmlFor="password"
            >
              Password
            </label>
          </div>

          {/* Confirm Password Field */}
          <div className="relative w-full rounded-lg">
            <input
              className={`w-full peer rounded-lg border ${
                signUp.confirmPassword.length !== 0 && signUp.password !== signUp.confirmPassword ? "border-red-600" : "border-sky-600"
              } bg-transparent px-4 py-2 text-sky-600 focus:outline-none`}
              type="password"
              id="confirmPassword"
              value={signUp.confirmPassword}
              onChange={(e) =>
                setSignUp((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              placeholder=" "
              required
            />
            <label
              className="absolute -top-2 left-2 rounded-md bg-sky-600 px-2 text-xs text-sky-100 duration-300 
                         peer-placeholder-shown:top-3 
                         peer-placeholder-shown:bg-transparent 
                         peer-placeholder-shown:text-sm 
                         peer-placeholder-shown:text-zinc-400 
                         peer-focus:-top-2 
                         peer-focus:bg-sky-600 
                         peer-focus:text-xs 
                         peer-focus:text-sky-100"
              htmlFor="confirmPassword"
            >
              Re-type Password
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md 
                       transition transform duration-300 ease-in-out 
                       hover:scale-105 focus:outline-none"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
