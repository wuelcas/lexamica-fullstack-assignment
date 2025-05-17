import Card from "react-bootstrap/Card";
import { useSortable } from "@dnd-kit/sortable";
import Image from "react-bootstrap/Image";

const Task = ({ task, isOverlay }) => {
  const { listeners, setNodeRef, transform } = useSortable({
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
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
      className={`mb-3 ${isOverlay ? "opacity-50" : ""}`}
    >
      <Card.Body className="d-flex align-items-center justify-content-between">
        <Card.Title>{task.name}</Card.Title>
        <Image src="/icons/drag-handle.svg" {...listeners} />
      </Card.Body>
    </Card>
  );
};

export default Task;
