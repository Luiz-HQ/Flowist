// components/dashboard/Column.tsx
import { useDroppable } from "@dnd-kit/core";
import { Task } from "@/services/task"; // Supondo que você tenha um arquivo de tipos
import { DraggableTaskCard } from "./DraggableTaskCard";

interface ColumnProps {
  id: "todo" | "inProgress" | "done";
  title: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  highlightedTaskId: string | null;
}

export function Column({
  id,
  title,
  tasks,
  onEdit,
  onDelete,
  highlightedTaskId,
}: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  const columnBackgroundColor = isOver ? "bg-blue-100" : "bg-gray-50";

  return (
    <div
      ref={setNodeRef}
      className={`w-full flex-shrink-0 snap-center p-2 max-w-sm rounded-[4px] shadow-md md:p-4 transition-colors duration-200 ${columnBackgroundColor}`}
    >
      <h3 className="font-bold text-lg text-center mb-4 flex justify-center items-center gap-2">
        {title}
        <p
          className={`text-sm font-semibold ${
            id === "todo"
              ? "text-red-500"
              : id === "inProgress"
              ? "text-yellow-500"
              : "text-green-500"
          } md:hidden`}
        >
          {tasks.length}
        </p>
      </h3>
      <div className="space-y-4">
        {tasks.map((task) => (
          <DraggableTaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            isHighlighted={task.id === highlightedTaskId}
          />
        ))}
      </div>
    </div>
  );
}
