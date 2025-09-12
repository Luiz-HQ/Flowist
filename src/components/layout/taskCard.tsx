import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Task } from "@/services/task";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  isHighlighted: boolean;
}

export default function TaskCard({
  task,
  onDelete,
  onEdit,
  isHighlighted,
}: TaskCardProps) {
  const isDone = task.status === "done";
  const doneStyle = isDone ? "line-through text-gray-500" : "";

  const highlightStyle = isHighlighted ? "animate-highlight" : "";

  return (
    <>
      <Card
        id={task.id}
        className={`w-full max-w-2xl p-2 rounded-[4px] ${
          isDone ? doneStyle : ""
        } ${highlightStyle}`}
      >
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{task.title}</CardTitle>
          <CardDescription>{task.description}</CardDescription>
          <div className="flex justify-end gap-1.5 mt-2">
            <Button
              onClick={() => onEdit(task)}
              className="size-[25px] bg-transparent hover:bg-transparent shadow-none transition-transform duration-200 ease-in-out hover:scale-140"
            >
              <Icon className="text-blue-500" icon="tabler:edit" />
            </Button>
            <Button
              onClick={() => onDelete(task.id)}
              className="size-[25px] bg-transparent hover:bg-transparent shadow-none transition-transform duration-200 ease-in-out hover:scale-140"
            >
              <Icon
                className="text-red-500"
                icon="material-symbols:delete-outline"
              />
            </Button>
          </div>
        </CardHeader>
      </Card>
    </>
  );
}
