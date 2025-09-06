"use client";

import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/dashboardHeader";
import TaskCard from "@/components/layout/taskCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { me } from "@/services/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { createTask, getTasks, Task } from "@/services/task";

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTasks = async () => {
    try {
      const userTasks = await getTasks();
      console.log("Dados recebidos da API:", userTasks);
      setTasks(userTasks);
    } catch (err) {
      console.error("Erro ao buscar tarefas:", err);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const userData = await me();
        setUserName(userData.name);
        setUserId(userData.id);

        await fetchTasks();
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
      }
    };
    fetchInitialData();
  }, []);

  const handleCreateTask = async () => {
    if (!taskTitle.trim()) {
      alert("O título da tarefa é obrigatório.");
      return;
    }

    try {
      await createTask(taskTitle, taskDescription);
      await fetchTasks();

      console.log("Criando tarefa:", {
        title: taskTitle,
        description: taskDescription,
      });

      setTaskTitle("");
      setTaskDescription("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      alert("Não foi possível criar a tarefa.");
    }
  };

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
              <p>
                {tasks && tasks.filter((task) => task.status === "todo").length}{" "}
                {"- A fazer"}
              </p>
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
              <div className="space-y-4">
                {tasks &&
                  tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      title={task.title}
                      description={task.description || ""}
                    />
                  ))}
              </div>
            </div>

            <div className="w-1/3 max-w-sm bg-gray-50 rounded-lg shadow-md p-4">
              <h3 className="font-bold text-lg text-center mb-4">
                Em andamento
              </h3>
              <div className="space-y-4">{/* Cards here */}</div>
            </div>

            <div className="w-1/3 max-w-sm bg-gray-50 rounded-lg shadow-md p-4">
              <h3 className="font-bold text-lg text-center mb-4">Concluído</h3>
              <div className="space-y-4">{/* Cards here */}</div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Barra Fixa com o Botão que Abre o Modal --- */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
        <div className="flex justify-center gap-x-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="w-1/2">Criar Tarefa</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Criar Nova Tarefa</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes da sua nova tarefa. Clique em "Salvar"
                  para concluir.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Título
                  </Label>
                  <Input
                    id="title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="col-span-3"
                    placeholder="Ex: Estudar documentação do Next.js"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Descrição
                  </Label>
                  <Input
                    id="description"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    className="col-span-3"
                    placeholder="(Opcional)"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" onClick={handleCreateTask}>
                  Salvar Tarefa
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
