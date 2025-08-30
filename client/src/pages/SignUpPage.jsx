import React, { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Callingpana from "../../public/Callingpana.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";
import useSignup from "../hooks/useSignup";

export default function SignUpPage() {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

 // This is how we did it at first, without using our custom hook
  // const queryClient = useQueryClient();
  // const {
  //   mutate: signupMutation,
  //   isPending,
  //   error,
  // } = useMutation({
  //   mutationFn: signup,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  // This is how we did it using our custom hook - optimized version
  const { isPending, error, signupMutation } = useSignup();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Form Section */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-20 py-10">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-2xl">
            <ShipWheelIcon className="w-8 h-8" />
            <span>ChatMit</span>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-2 rounded-lg text-sm">
              {error?.response?.data?.message || "Something went wrong!"}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSignup}
            className="bg-white shadow-lg rounded-2xl p-8 space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Create an Account
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                Join ChatMit and start your language learning adventure!
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={signupData.fullName}
                  onChange={(e) =>
                    setSignupData({ ...signupData, fullName: e.target.value })
                  }
                  required
                  autoFocus
                  className="mt-1 w-full px-3 py-2 border border-gray-300 text-black placeholder:text-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="john@gmail.com"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 text-black placeholder:text-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="********"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                  required
                  minLength={6}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 text-black placeholder:text-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 6 characters long
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <input type="checkbox" required className="h-4 w-4" />
                <span className="text-gray-600">
                  I agree to the{" "}
                  <span className="text-indigo-600 font-medium cursor-pointer">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-indigo-600 font-medium cursor-pointer">
                    Privacy Policy
                  </span>
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className={`w-full py-2 rounded-lg font-semibold transition ${
                isPending
                  ? "bg-indigo-400 text-white cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {isPending ? "Signing up..." : "Create Account"}
            </button>

            {/* Redirect */}
            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 font-medium">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Info Section */}
      <div className="flex-1 bg-indigo-50 flex items-center justify-center px-6 sm:px-8 lg:px-20 py-10">
        <div className="text-center space-y-6">
          <img
            src={Callingpana}
            alt="signup illustration"
            className="max-w-sm mx-auto"
          />
          <h2 className="text-2xl font-bold text-indigo-700">
            Practice & Learn
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Practice conversations, make friends, and improve your language
            skills together with ChatMit.
          </p>
        </div>
      </div>
    </div>
  );
}
