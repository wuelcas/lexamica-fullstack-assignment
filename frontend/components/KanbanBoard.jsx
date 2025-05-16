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
import { useState } from "react";
import {
  useSensor,
  useSensors,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
} from "@dnd-kit/core";

const initialCategories = [
  {
    id: "category-1",
    name: "Category 1",
    position: 1,
    tasks: [
      {
        id: "task-1",
        name: "Task 1",
        category: "category-1",
        position: 1,
      },
      {
        id: "task-20",
        name: "Task 20",
        category: "category-1",
        position: 2,
      },
    ],
  },
  {
    id: "category-2",
    name: "Category 2",
    position: 2,
    tasks: [
      {
        id: "task-2",
        name: "Task 2",
        category: "category-2",
        position: 1,
      },
    ],
  },
  {
    id: "category-3",
    name: "Category 3",
    position: 3,
    tasks: [
      {
        id: "task-3",
        name: "Task 3",
        category: "category-3",
        position: 1,
      },
    ],
  },
  {
    id: "category-4",
    name: "Category 4",
    position: 4,
    tasks: [
      {
        id: "task-4",
        name: "Task 4",
        category: "category-4",
        position: 1,
      },
    ],
  },
  {
    id: "category-5",
    name: "Category 5",
    position: 5,
    tasks: [
      {
        id: "task-5",
        name: "Task 5",
        category: "category-5",
        position: 1,
      },
    ],
  },
];

const KanbanBoard = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const moveCategory = (active, over) => {
    setCategories((items) => {
      const oldPosition = active.data.current.position;
      const newPosition = over.data.current.position;

      const movedToRight = newPosition > oldPosition;
      const newCategories = items.map((category) => {
        if (category.id === active.id) {
          return {
            ...category,
            position: newPosition,
          };
        }

        if (movedToRight && category.position <= newPosition) {
          return {
            ...category,
            position: category.position - 1,
          };
        }

        if (!movedToRight && category.position >= newPosition) {
          return {
            ...category,
            position: category.position + 1,
          };
        }
        return category;
      });

      return newCategories;
    });
  };

  const moveTaskInSameCategory = (active, over) => {
    const categoryTasks = [
      ...categories.find((item) => item.id === active.data.current.category)
        .tasks,
    ];
    const oldPosition = active.data.current.position;
    const newPosition = over.data.current.position;
    const movedDown = newPosition > oldPosition;

    const newTasks = categoryTasks.map((task) => {
      if (task.id === active.id) {
        return {
          ...task,
          position: newPosition,
        };
      }

      if (movedDown && task.position <= newPosition) {
        return {
          ...task,
          position: task.position - 1,
        };
      }

      if (!movedDown && task.position >= newPosition) {
        return {
          ...task,
          position: task.position + 1,
        };
      }
      return task;
    });

    const newCategories = [...categories];
    newCategories.find(
      (item) => item.id === active.data.current.category
    ).tasks = newTasks;

    setCategories(newCategories);
  };

  const moveTaskToADifferentCategory = (active, over) => {
    setCategories((items) => {
      const activeTask = items
        .find((item) => item.id === active.data.current.category)
        .tasks.find((task) => task.id === active.id);

      const newItems = items.map((category) => {
        const isNewCategory = category.id === over.data.current.category;
        const isOldCategory = category.id === active.data.current.category;

        if (isNewCategory) {
          const newPosition = over.data.current.position;
          const newTasks = category.tasks.map((task) => {
            if (task.position >= newPosition) {
              return {
                ...task,
                position: task.position + 1,
              };
            }

            return task;
          });

          newTasks.push({
            ...activeTask,
            position: newPosition,
            category: over.data.current.category,
          });

          return {
            ...category,
            tasks: newTasks,
          };
        }

        if (isOldCategory) {
          const newTasks = category.tasks.filter(
            (task) => task.id !== active.id
          );
          return {
            ...category,
            tasks: newTasks,
          };
        }

        return category;
      });

      return newItems;
    });
  };

  const moveTaskToACategory = (active, over) => {
    setCategories((items) => {
      const activeTask = items
        .find((item) => item.id === active.data.current.category)
        .tasks.find((task) => task.id === active.id);

      const newItems = items.map((category) => {
        const isNewCategory = category.id === over.id;
        const isOldCategory = category.id === active.data.current.category;

        if (isNewCategory) {
          const newTasks = category.tasks.map((task) => ({
            ...task,
            position: task.position + 1,
          }));

          newTasks.push({
            ...activeTask,
            position: 1,
            category: category.id,
          });

          return {
            ...category,
            tasks: newTasks,
          };
        }

        if (isOldCategory) {
          const newTasks = category.tasks.filter(
            (task) => task.id !== active.id
          );
          return {
            ...category,
            tasks: newTasks,
          };
        }

        return category;
      });

      return newItems;
    });
  };

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
      moveCategory(active, over);
      return;
    }

    if (isMovingATaskInTheSameCategory) {
      moveTaskInSameCategory(active, over);
      return;
    }

    if (isMovingATaskToADifferentCategory) {
      moveTaskToADifferentCategory(active, over);
      return;
    }

    if (isMovingATaskToTheTopOfACategory) {
      moveTaskToACategory(active, over);
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
          <CreateCategory />
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
