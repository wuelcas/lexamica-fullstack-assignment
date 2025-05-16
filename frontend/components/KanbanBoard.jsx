import Row from "react-bootstrap/Row";
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
    <Row className="flex-nowrap overflow-auto px-2">
      {categories.map((category) => (
        <div className="px-2" style={{ width: "350px" }}>
          <Category key={category.id} category={category} />
        </div>
      ))}
      <div className="px-2" style={{ width: "350px" }}>
        <CreateCategory />
      </div>
    </Row>
  );
};
export default KanbanBoard;
