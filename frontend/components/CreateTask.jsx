import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const CreateTask = () => {
  const [isCreateTaskFormVisible, setIsCreateTaskFormVisible] = useState(false);

  const showCreateTaskForm = () => {
    setIsCreateTaskFormVisible(true);
  };

  const hideCreateTaskForm = () => {
    setIsCreateTaskFormVisible(false);
  };

  return (
    <div>
      {!isCreateTaskFormVisible && (
        <Button variant="outline-primary" onClick={showCreateTaskForm}>
          Create a Task
        </Button>
      )}
      {isCreateTaskFormVisible && (
        <Form>
          <Form.Group controlId="taskName" className="mb-2">
            <Form.Control type="text" placeholder="Enter task name" />
          </Form.Group>
          <div className="d-flex gap-2">
            <Button
              variant="primary"
              type="submit"
              onClick={hideCreateTaskForm}
            >
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
