import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useAtom } from "jotai";
import { createTaskAtom } from "../stores/atoms";

const CreateTask = ({ category, position }) => {
  const [, createTask] = useAtom(createTaskAtom);
  const [isCreateTaskFormVisible, setIsCreateTaskFormVisible] = useState(false);

  const showCreateTaskForm = () => {
    setIsCreateTaskFormVisible(true);
  };

  const hideCreateTaskForm = () => {
    document.getElementById(`taskName-${category.id}`).value = "";
    setIsCreateTaskFormVisible(false);
  };

  const createNewTask = (event) => {
    event.preventDefault();
    createTask({
      name: event.target[`taskName-${category.id}`].value,
      category,
      position,
    });
    hideCreateTaskForm();
  };

  if (isCreateTaskFormVisible) {
    setTimeout(() => {
      document.getElementById(`taskName-${category.id}`).scrollIntoView({
        behavior: "smooth",
      });
    }, 10);
  }

  return (
    <div>
      {!isCreateTaskFormVisible && (
        <Button variant="outline-primary" onClick={showCreateTaskForm}>
          Create a Task
        </Button>
      )}
      {isCreateTaskFormVisible && (
        <Form onSubmit={createNewTask}>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              placeholder="Enter task name"
              id={`taskName-${category.id}`}
              autoFocus
            />
          </Form.Group>
          <div className="d-flex gap-2">
            <Button variant="primary" type="submit">
              Create
            </Button>
            <Button variant="secondary" onClick={hideCreateTaskForm}>
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default CreateTask;
