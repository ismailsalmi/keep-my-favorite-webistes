"use client";
import React, { useState } from "react";
import Layout from "@/components/layout";
import { useSupabaseClient } from "../hooks/use-supabase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useSupabaseClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signUp({ email, password });
    setLoading(false);
    setError(error!);
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
      <div className="min-h-screen bg-white">
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Register an account
              </h2>
            </div>
            <form onSubmit={handleRegister} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm space-y-4">
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
                <div>
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="m@example.com"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 border-2 border-black rounded-md"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center flex-row text-lg font-semibold bg-black text-white p-2 border-2 rounded-md"
                  disabled={loading}
                >
                  {loading ? `Registring...` : `Register`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
