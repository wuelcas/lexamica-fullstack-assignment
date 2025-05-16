import Card from "react-bootstrap/Card";
import Task from "./Task";
import CreateTask from "./CreateTask";

const Category = ({ category }) => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>{category.name}</Card.Title>
      </Card.Header>
      <Card.Body>
        {category.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
        <CreateTask />
      </Card.Body>
    </Card>
  );
};

export default Category;
