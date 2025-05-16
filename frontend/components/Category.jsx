import Card from "react-bootstrap/Card";
import Task from "./Task";
import CreateTask from "./CreateTask";
import { useSortable } from "@dnd-kit/sortable";
import { SortableContext } from "@dnd-kit/sortable";
import { verticalSortingStrategy } from "@dnd-kit/sortable";

const Category = ({ category, isOverlay }) => {
  const { listeners, setNodeRef, transform } = useSortable({
    id: category.id,
    data: {
      type: "category",
      position: category.position,
    },
  });

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
      className={isOverlay ? "opacity-50" : ""}
    >
      <Card.Header>
        <Card.Title>{category.name}</Card.Title>
      </Card.Header>
      <Card.Body>
        <SortableContext
          items={category.tasks}
          strategy={verticalSortingStrategy}
        >
          {category.tasks
            .sort((a, b) => a.position - b.position)
            .map((task) => (
              <Task key={task.id} task={task} />
            ))}
          <CreateTask />
        </SortableContext>
      </Card.Body>
    </Card>
  );
};

export default Category;
