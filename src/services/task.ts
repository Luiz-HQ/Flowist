export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
}

export async function getTasks(): Promise<Task[]> {
  const res = await fetch("/api/task");

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro ao buscar tarefas");
  }

  return res.json();
}

export async function createTask(
  taskTitle: string,
  taskDescription: string
): Promise<Task> {
  const res = await fetch("/api/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ title: taskTitle, description: taskDescription }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro ao criar tarefa");
  }

  return res.json();
}
