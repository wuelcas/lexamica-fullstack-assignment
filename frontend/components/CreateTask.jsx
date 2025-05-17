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
    document.getElementById("taskName").value = "";
    setIsCreateTaskFormVisible(false);
  };

  const createNewTask = (event) => {
    event.preventDefault();
    createTask({
      name: event.target.taskName.value,
      category,
      position,
    });
    hideCreateTaskForm();
  };

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
              id="taskName"
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
