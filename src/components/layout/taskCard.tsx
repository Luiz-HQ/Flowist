import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Task } from "@/services/task";
import { GripVertical } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  isHighlighted: boolean;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
}

export default function TaskCard({
  task,
  onDelete,
  onEdit,
  isHighlighted,
  dragHandleProps,
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
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <CardTitle className="text-2xl font-bold">{task.title}</CardTitle>
              <CardDescription>{task.description}</CardDescription>
            </div>

            <Button
              variant="link"
              {...dragHandleProps}
              className="transition-transform duration-200 ease-in-out hover:scale-140 cursor-grab"
              aria-label="Arrastar tarefa"
            >
              <GripVertical className="hidden md:flex" size={20} />
            </Button>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-end gap-1.5 mt-2">
          <Button
            variant="link"
            className="transition-transform duration-200 ease-in-out hover:scale-140"
            onClick={() => onEdit(task)}
          >
            <Icon className="text-blue-500 cursor-pointer" icon="tabler:edit" />
          </Button>
          <Button
            variant="link"
            className="transition-transform duration-200 ease-in-out hover:scale-140"
            onClick={() => onDelete(task.id)}
          >
            <Icon
              className="text-red-500 cursor-pointer"
              icon="material-symbols:delete-outline"
            />
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
