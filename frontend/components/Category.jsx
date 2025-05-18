import Card from "react-bootstrap/Card";
import Task from "./Task";
import CreateTask from "./CreateTask";
import { useSortable } from "@dnd-kit/sortable";
import { SortableContext } from "@dnd-kit/sortable";
import { verticalSortingStrategy } from "@dnd-kit/sortable";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useAtom } from "jotai";
import { deleteCategoryAtom } from "../stores/atoms";

const Category = ({ category, isOverlay }) => {
  const [, deleteCategory] = useAtom(deleteCategoryAtom);
  const { listeners, setNodeRef, transform } = useSortable({
    id: category.id,
    data: {
      type: "category",
      position: category.position,
    },
  });

  const deleteCategoryHandler = () => {
    deleteCategory(category);
  };

  return (
    <Card
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
      className={isOverlay ? "opacity-50" : ""}
    >
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Card.Title>{category.name}</Card.Title>
        <div className="d-flex gap-2">
          <Button variant="light" onClick={deleteCategoryHandler}>
            <Image src="/icons/delete.svg" />
          </Button>
          <Image
            src="/icons/drag-handle.svg"
            {...listeners}
            style={{ cursor: "grab" }}
          />
        </div>
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
          <CreateTask
            category={category.id}
            position={category.tasks.length + 1}
          />
        </SortableContext>
      </Card.Body>
    </Card>
  );
};

export default Category;
