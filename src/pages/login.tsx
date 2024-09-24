"use client";
import Layout from "@/components/layout";
import React, { useState, useTransition } from "react";
import { useSupabaseClient } from "../hooks/use-supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [transition, startTransition] = useTransition();

  const { signInWithOAuth, signInWithMagicLink } = useSupabaseClient();

  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await signInWithMagicLink(email);
    setError(error);
    setLoading(false);
  };

  const handleGitHubLogin = () => {
    startTransition(async () => {
      const { error } = await signInWithOAuth("github");
      setError(error);
    });
  };

  if (error)
    return (
      <Layout>
        <div className="min-h-screen flex flex-col space-y-2 justify-center items-center">
          <p className="text-xl font-semibold text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-xl font-semibold text-gray-600 bg-transparent border-2 p-1 rounded-md hover:border-gray-500"
          >
            Try again
          </button>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="flex items-center justify-center p-4 min-h-screen mt-16 -mb-16">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
            <p className="text-gray-600 text-sm">
              Sign in to your account using Magic Link or GitHub
            </p>
          </div>
          <form onSubmit={handleMagicLinkLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border-2 border-black rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center flex-row text-lg font-semibold bg-black text-white p-2 border-2 rounded-md"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending Magic Link
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  Send Magic Link
                </>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <button
            disabled={transition}
            className="w-full flex justify-center items-center flex-row text-lg font-semibold bg-transparent text-black p-2 border-2 rounded-md"
            onClick={handleGitHubLogin}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                clipRule="evenodd"
              />
            </svg>
            {transition ? "Loading" : "GitHub"}
          </button>
          <p className="mt-6 text-center text-xs text-gray-600">
            By clicking continue, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </Layout>
  );
}
