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

interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: "todo" | "inProgress" | "done";
}

export async function updateTask(id: string, data: UpdateTaskData) {
  const res = await fetch(`api/task/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro ao atualizar tarefa");
  }

  return res.json();
}

export async function deleteTask(id: string) {
  const res = await fetch(`/api/task/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro ao deletar tarefa");
  }
}
