import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        {/* LOGO */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <ShipWheelIcon className="w-8 h-8 text-indigo-600" />
          <span className="text-2xl font-bold text-gray-900">Streamify</span>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-300 text-red-700 px-4 py-2 text-sm">
            {error.response?.data?.message || "Something went wrong"}
          </div>
        )}

        {/* HEADING */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500">
            Sign in to your account to continue your language journey
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5 text-black placeholder:text-black">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="hello@example.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-indigo-600 text-white font-medium py-2 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
          >
            {isPending && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
