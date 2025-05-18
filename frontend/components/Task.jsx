import Card from "react-bootstrap/Card";
import { useSortable } from "@dnd-kit/sortable";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useAtom } from "jotai";
import { deleteTaskAtom } from "../stores/atoms";

const Task = ({ task, isOverlay }) => {
  const [, deleteTask] = useAtom(deleteTaskAtom);
  const { listeners, setNodeRef, transform } = useSortable({
    id: task.id,
    data: {
      type: "task",
      category: task.category,
      position: task.position,
    },
  });

  const deleteTaskHandler = () => {
    deleteTask(task);
  };

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
        <div className="d-flex gap-2">
          <Button variant="light" onClick={deleteTaskHandler}>
            <Image src="/icons/delete.svg" />
          </Button>
          <Image
            src="/icons/drag-handle.svg"
            {...listeners}
            style={{ cursor: "grab" }}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default Task;
