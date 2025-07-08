"use client";

import { Button } from "@/components/ui/button";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(email, password);
      console.log(res);
      localStorage.setItem("token", res.token);
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message || "Erro ao fazer login");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              onChange={(e) => setPasword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-500 transition duration-200"
          >
            Entrar
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
