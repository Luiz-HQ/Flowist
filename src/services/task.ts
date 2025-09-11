export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "inProgress" | "done";
}

export async function getTasks(): Promise<Task[]> {
  const res = await fetch("/api/task");

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro ao buscar tarefas");
  }

  return res.json();
}

interface CreateTaskData {
  title: string;
  description?: string;
  status: "todo" | "inProgress" | "done";
}

export async function createTask(data: CreateTaskData): Promise<Task> {
  const res = await fetch("/api/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro ao criar tarefa");
  }

  return res.json();
}
