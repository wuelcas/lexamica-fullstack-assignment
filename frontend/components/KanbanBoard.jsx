import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Category from "./Category";
import CreateCategory from "./CreateCategory";

const categories = [
  {
    id: 1,
    name: "Category 1",
    tasks: [
      {
        id: 1,
        name: "Task 1",
      },
    ],
  },
  {
    id: 1,
    name: "Category 1",
    tasks: [
      {
        id: 1,
        name: "Task 1",
      },
    ],
  },
  {
    id: 1,
    name: "Category 1",
    tasks: [
      {
        id: 1,
        name: "Task 1",
      },
    ],
  },
  {
    id: 1,
    name: "Category 1",
    tasks: [
      {
        id: 1,
        name: "Task 1",
      },
    ],
  },
  {
    id: 1,
    name: "Category 1",
    tasks: [
      {
        id: 1,
        name: "Task 1",
      },
    ],
  },
];

const KanbanBoard = () => {
  return (
    <Row className="flex-nowrap overflow-auto">
      {categories.map((category) => (
        <Col xs={4} className="px-2">
          <Category key={category.id} category={category} />
        </Col>
      ))}
      <Col xs={4} className="px-2">
        <CreateCategory />
      </Col>
    </Row>
  );
};
export default KanbanBoard;
