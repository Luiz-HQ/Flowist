"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import DashboardHeader from "@/components/layout/dashboardHeader";
import TaskCard from "@/components/layout/taskCard";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/layout/footer";

interface DecodedToken {
  name: string;
  id: string;
}

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUserName(decoded.name);
        setUserId(decoded.id);
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 w-full pb-24">
      <DashboardHeader />
      <div className="flex flex-col items-center justify-start">
        <div className="h-28 bg-white flex flex-col items-center justify-start pt-5 gap-y-4 w-full border-b">
          <h1 className="flex items-center justify-center gap-x-1 text-2xl font-semibold">
            Bem vindo
            <p className="font-normal">{userName ? userName : ""}</p>
          </h1>
          <h2 className="flex justify-between w-1/2 text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <p>3 - A fazer</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <p>5 - Em andamento</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <p>2 - Concluído</p>
            </div>
          </h2>
        </div>

        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="flex justify-center gap-x-6">
            <div className="w-1/3 max-w-sm bg-gray-50 rounded-lg shadow-md p-4">
              <h3 className="font-bold text-lg text-center mb-4">A fazer</h3>
              <div className="space-y-4">{/* Cards aqui */}</div>
            </div>

            <div className="w-1/3 max-w-sm bg-gray-50 rounded-lg shadow-md p-4">
              <h3 className="font-bold text-lg text-center mb-4">
                Em andamento
              </h3>
              <div className="space-y-4">{/* Cards aqui */}</div>
            </div>

            <div className="w-1/3 max-w-sm bg-gray-50 rounded-lg shadow-md p-4">
              <h3 className="font-bold text-lg text-center mb-4">Concluído</h3>
              <div className="space-y-4">{/* Cards aqui */}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
        <div className="flex justify-center gap-x-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button className="w-1/2 ">Criar Tarefa</Button>
        </div>
      </div>
    </div>
  );
}
