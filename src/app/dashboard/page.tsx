"use client";

import { useState, useEffect, FormEvent } from "react";
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
import {
  createTask,
  deleteTask,
  getTasks,
  Task,
  updateTask,
} from "@/services/task";
import { ArrowRight } from "lucide-react";

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState<"todo" | "inProgress" | "done">(
    "todo"
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedTaskId, setHighlightedTaskId] = useState<string | null>(
    null
  );

  const handleSeacrhChange = (term: string) => {
    setSearchTerm(term);

    if (term.trim() === "") {
      setHighlightedTaskId(null);
      return;
    }
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (searchTerm.trim() === "") {
      setHighlightedTaskId(null);
      return;
    }

    const foundTask = tasks.find((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (foundTask) {
      setHighlightedTaskId(foundTask.id);

      document
        .getElementById(foundTask.id)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      setHighlightedTaskId(null);
      alert("Nenhuma tarefa encontrada com esse título.");
    }
  };

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
        setUserName(userData.name || "");
        setUserId(userData.id);

        await fetchTasks();
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
      }
    };
    fetchInitialData();
  }, []);

  const handleSaveTask = async (e: FormEvent) => {
    e.preventDefault();

    if (!taskTitle.trim()) {
      alert("O título da tarefa é obrigatório.");
      return;
    }

    const taskData = {
      title: taskTitle,
      description: taskDescription,
      status: taskStatus,
    };

    try {
      if (editingTask) {
        // Edit mode
        const updatedTask = await updateTask(editingTask.id, taskData);

        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            task.id === editingTask.id ? updatedTask : task
          )
        );
      } else {
        // Create mode
        const newTask = await createTask(taskData);
        setTasks((currentTasks) => [...currentTasks, newTask]);
      }

      setIsModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error("Erro ao salvar tarefa:", error);
      alert("Não foi possível salvar a tarefa.");
    }
  };

  const handleCreateClick = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (editingTask) {
      setTaskTitle(editingTask.title);
      setTaskDescription(editingTask.description || "");
      setTaskStatus(editingTask.status);
    } else {
      setTaskTitle("");
      setTaskDescription("");
      setTaskStatus("todo");
    }
  }, [editingTask, isModalOpen]);

  const handleDeleteTask = async (id: string) => {
    const isConfirmed = confirm("Tem certeza que deseja deletar esta tarefa?");
    if (!isConfirmed) return;

    try {
      await deleteTask(id);
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      alert("Não foi possível deletar a tarefa.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 w-full pb-24">
      <DashboardHeader
        searchTerm={searchTerm}
        onSearchChange={handleSeacrhChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <div className="flex flex-col items-center justify-start">
        <div className="h-28 bg-white flex flex-col items-center justify-start pt-5 gap-y-4 w-full border-b">
          <h1 className="flex flex-col md:flex-row items-center justify-center gap-x-1 text-2xl font-semibold">
            Bem vindo
            <p className="font-normal">{userName ? userName : ""}</p>
          </h1>
          <h2 className="hidden md:flex justify-between w-1/2 text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <p>
                {tasks && tasks.filter((task) => task.status === "todo").length}{" "}
                {"- A fazer"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <p>
                {tasks &&
                  tasks.filter((task) => task.status === "inProgress")
                    .length}{" "}
                {"- Em andamento"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <p>
                {tasks && tasks.filter((task) => task.status === "done").length}{" "}
                {"- Concluído"}
              </p>
            </div>
          </h2>
        </div>

        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="w-full min-h-36 flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-8">
            <div className="w-full flex-shrink-0 snap-center p-2 max-w-sm bg-gray-50  rounded-[4px] shadow-md md:p-4">
              <h3 className="font-bold text-lg text-center mb-4 flex justify-center items-center gap-2">
                A fazer
                <p className="text-red-500 md:hidden">
                  {tasks &&
                    tasks.filter((task) => task.status === "todo").length}{" "}
                </p>
              </h3>
              <div className="space-y-4">
                {tasks &&
                  tasks
                    .filter((task) => task.status === "todo")
                    .map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteTask}
                        isHighlighted={task.id === highlightedTaskId}
                      />
                    ))}
              </div>
            </div>

            <div className="w-full flex-shrink-0 snap-center p-2 max-w-sm bg-gray-50  rounded-[4px] shadow-md md:p-4">
              <h3 className="font-bold text-lg text-center mb-4 flex justify-center items-center gap-2">
                Em andamento
                <p className="text-yellow-500 md:hidden">
                  {tasks &&
                    tasks.filter((task) => task.status === "inProgress")
                      .length}{" "}
                </p>
              </h3>
              <div className="space-y-4">
                {tasks &&
                  tasks
                    .filter((task) => task.status === "inProgress")
                    .map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteTask}
                        isHighlighted={task.id === highlightedTaskId}
                      />
                    ))}
              </div>
            </div>

            <div className="w-full flex-shrink-0 snap-center p-2 max-w-sm bg-gray-50  rounded-[4px] shadow-md md:p-4">
              <h3 className="font-bold text-lg text-center mb-4 flex justify-center items-center gap-2">
                Concluído
                <p className="text-green-500 md:hidden">
                  {tasks &&
                    tasks.filter((task) => task.status === "done").length}{" "}
                </p>
              </h3>
              <div className="space-y-4">
                {tasks &&
                  tasks
                    .filter((task) => task.status === "done")
                    .map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteTask}
                        isHighlighted={task.id === highlightedTaskId}
                      />
                    ))}
              </div>
            </div>
          </div>
          <span className="text-slate-500 text-sm italic flex md:hidden items-center justify-center py-2">
            arraste para o lado <ArrowRight className="ml-1.5 h-4 w-4" />
          </span>
        </div>
      </div>

      {/* --- Barra Fixa com o Botão que Abre o Modal --- */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
        <div className="flex justify-center gap-x-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleCreateClick}
                className="w-1/2 rounded-[4px]"
              >
                Criar Tarefa
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[4px] sm:max-w-[500px]">
              <form onSubmit={handleSaveTask}>
                <DialogHeader>
                  <DialogTitle>
                    {editingTask ? "Editar Tarefa" : "Criar Tarefa"}
                  </DialogTitle>
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
                      className="rounded-[4px] col-span-3"
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
                      className="rounded-[4px] col-span-3"
                      placeholder="(Opcional)"
                    />
                  </div>

                  <div className="flex">
                    <Label htmlFor="status" className="text-right">
                      Status:
                    </Label>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:justify-center md:items-center w-full md:p-2">
                      <Label
                        htmlFor="status-todo"
                        className="w-2/3 justify-start md:justify-center flex items-center gap-1 cursor-pointer"
                      >
                        <Input
                          id="status-todo"
                          type="radio"
                          name="task-status-group"
                          value="todo"
                          checked={taskStatus === "todo"}
                          onChange={(e) =>
                            setTaskStatus(
                              e.target.value as "todo" | "inProgress" | "done"
                            )
                          }
                          className="size-[12px] cursor-pointer"
                        />
                        <span className="text-sm">A fazer</span>
                      </Label>

                      <Label
                        htmlFor="status-inProgress"
                        className="flex w-2/3 justify-start items-center gap-1 cursor-pointer"
                      >
                        <Input
                          id="status-inProgress"
                          type="radio"
                          name="task-status-group"
                          value="inProgress"
                          checked={taskStatus === "inProgress"}
                          onChange={(e) =>
                            setTaskStatus(
                              e.target.value as "todo" | "inProgress" | "done"
                            )
                          }
                          className="size-[12px] cursor-pointer"
                        />
                        <span className="text-sm">Em andamento</span>
                      </Label>

                      <Label
                        htmlFor="status-concluido"
                        className="flex w-2/3 justify-start items-center gap-1 cursor-pointer"
                      >
                        <Input
                          id="status-concluido"
                          type="radio"
                          name="task-status-group"
                          value="done"
                          checked={taskStatus === "done"}
                          onChange={(e) =>
                            setTaskStatus(
                              e.target.value as "todo" | "inProgress" | "done"
                            )
                          }
                          className="size-[12px] cursor-pointer"
                        />
                        <span className="text-sm">Concluído</span>
                      </Label>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button type="submit" className=" rounded-[4px]">
                    Salvar Tarefa
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
