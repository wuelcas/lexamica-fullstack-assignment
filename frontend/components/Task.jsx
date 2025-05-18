import Card from "react-bootstrap/Card";
import { useSortable } from "@dnd-kit/sortable";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useAtom } from "jotai";
import { deleteTaskAtom } from "../stores/atoms";
import { useState } from "react";
import useClickAway from "../hooks/useClickAway";
import Form from "react-bootstrap/Form";
import { updateTaskNameAtom } from "../stores/atoms";

const Task = ({ task, isOverlay }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(task.name);
  const [, deleteTask] = useAtom(deleteTaskAtom);
  const [, updateTaskName] = useAtom(updateTaskNameAtom);
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

  const editTaskNameHandler = (e) => {
    e.preventDefault();
    if (newName === task.name) {
      setIsEditingName(false);
      return;
    }
    updateTaskName({
      ...task,
      name: newName,
    });
    setIsEditingName(false);
  };

  const ref = useClickAway(editTaskNameHandler);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      editTaskNameHandler(e);
    }
  };

  const openEditNameForm = () => {
    setIsEditingName(true);
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
        {!isEditingName && (
          <Button variant="light" onClick={openEditNameForm}>
            <Card.Title>{task.name}</Card.Title>
          </Button>
        )}
        {isEditingName && (
          <Form onSubmit={editTaskNameHandler}>
            <Form.Control
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={handleKeyDown}
              ref={ref}
              autoFocus
            />
          </Form>
        )}

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
