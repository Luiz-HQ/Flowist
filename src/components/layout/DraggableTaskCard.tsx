import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./taskCard";
import { Task } from "@/services/task";

interface DraggableTaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  isHighlighted: boolean;
}

export function DraggableTaskCard({
  task,
  onEdit,
  onDelete,
  isHighlighted,
}: DraggableTaskCardProps) {
  // AQUI ESTÁ A MUDANÇA: separamos os listeners dos attributes
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <TaskCard
        task={task}
        onEdit={onEdit}
        onDelete={onDelete}
        isHighlighted={isHighlighted}
        dragHandleProps={listeners}
      />
    </div>
  );
}
