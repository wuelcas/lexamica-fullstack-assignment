import Card from "react-bootstrap/Card";
import { useSortable } from "@dnd-kit/sortable";

const Task = ({ task, isOverlay }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: task.id,
      data: {
        type: "task",
        category: task.category,
        position: task.position,
      },
    });

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
      className={`mb-3 ${isOverlay ? "opacity-50" : ""}`}
    >
      <Card.Body>
        <Card.Title>{task.name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default Task;
