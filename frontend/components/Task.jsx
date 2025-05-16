import Card from "react-bootstrap/Card";

const Task = ({ task }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{task.name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default Task;
