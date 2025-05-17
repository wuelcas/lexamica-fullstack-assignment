import Row from "react-bootstrap/Row";
import Category from "./Category";
import Task from "./Task";
import CreateCategory from "./CreateCategory";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import {
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useState, useEffect } from "react";
import {
  useSensor,
  useSensors,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
} from "@dnd-kit/core";
import {
  moveCategoryPositionAtom,
  moveTaskPositionInSameCategoryAtom,
  moveTaskToADifferentCategoryAtom,
  moveTaskAtTheTopOfACategoryAtom,
  categoriesAtom,
} from "../stores/atoms";
import { useAtom } from "jotai";
import { getCategories } from "../api/categories";

const KanbanBoard = () => {
  const [categories, setCategories] = useAtom(categoriesAtom);
  const [, moveCategoryPosition] = useAtom(moveCategoryPositionAtom);
  const [, moveTaskPositionInSameCategory] = useAtom(
    moveTaskPositionInSameCategoryAtom
  );
  const [, moveTaskToADifferentCategory] = useAtom(
    moveTaskToADifferentCategoryAtom
  );
  const [, moveTaskAtTheTopOfACategory] = useAtom(
    moveTaskAtTheTopOfACategoryAtom
  );

  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    fetchCategories();

    return () => {
      setCategories([]);
    };
  }, []);

  const onDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    const isMovingADifferentCategory =
      active.data.current.type === "category" &&
      over.data.current.type === "category" &&
      active.id !== over.id;

    const isMovingATaskInTheSameCategory =
      active.data.current.type === "task" &&
      over.data.current.type === "task" &&
      active.id !== over.id &&
      active.data.current.category === over.data.current.category;

    const isMovingATaskToADifferentCategory =
      active.data.current.type === "task" &&
      over.data.current.type === "task" &&
      active.id !== over.id &&
      active.data.current.category !== over.data.current.category;

    const isMovingATaskToTheTopOfACategory =
      active.data.current.type === "task" &&
      over.data.current.type === "category";

    if (isMovingADifferentCategory) {
      moveCategoryPosition(active, over);
      return;
    }

    if (isMovingATaskInTheSameCategory) {
      moveTaskPositionInSameCategory(active, over);
      return;
    }

    if (isMovingATaskToADifferentCategory) {
      moveTaskToADifferentCategory(active, over);
      return;
    }

    if (isMovingATaskToTheTopOfACategory) {
      moveTaskAtTheTopOfACategory(active, over);
      return;
    }
  };

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      sensors={sensors}
      collisionDetection={closestCorners}
    >
      <Row className="flex-nowrap overflow-auto px-2">
        <SortableContext
          items={categories}
          strategy={horizontalListSortingStrategy}
        >
          {categories
            .sort((a, b) => a.position - b.position)
            .map((category) => (
              <div
                key={category.id}
                className="px-2"
                style={{ width: "350px" }}
              >
                <Category category={category} />
              </div>
            ))}
        </SortableContext>
        <div className="px-2" style={{ width: "350px" }}>
          <CreateCategory position={categories.length + 1} />
        </div>
      </Row>
      <DragOverlay>
        {activeId
          ? categories.find((category) => category.id === activeId)
            ? renderCategoryDragOverlay(activeId)
            : renderTaskDragOverlay(activeId)
          : null}
      </DragOverlay>
    </DndContext>
  );

  function renderCategoryDragOverlay(id) {
    const category = categories.find((category) => category.id === id);
    return <Category category={category} isOverlay />;
  }

  function renderTaskDragOverlay(id) {
    const task = categories
      .find((category) => category.tasks.some((task) => task.id === id))
      .tasks.find((task) => task.id === id);
    return <Task task={task} isOverlay />;
  }
};

export default KanbanBoard;
