import { atom } from "jotai";

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

export const categoriesAtom = atom(initialCategories);

export const moveCategoryPositionAtom = atom(null, (get, set, active, over) => {
  const categories = get(categoriesAtom);
  const oldPosition = active.data.current.position;
  const newPosition = over.data.current.position;
  const movedToRight = newPosition > oldPosition;
  const newCategories = categories.map((category) => {
    if (category.id === active.id) {
      return { ...category, position: newPosition };
    }
    if (movedToRight && category.position <= newPosition) {
      return { ...category, position: category.position - 1 };
    }
    if (!movedToRight && category.position >= newPosition) {
      return { ...category, position: category.position + 1 };
    }
    return category;
  });
  set(categoriesAtom, newCategories);
});

export const moveTaskPositionInSameCategoryAtom = atom(
  null,
  (get, set, active, over) => {
    const categories = get(categoriesAtom);
    const categoryTasks = [
      ...categories.find((item) => item.id === active.data.current.category)
        .tasks,
    ];
    const oldPosition = active.data.current.position;
    const newPosition = over.data.current.position;
    const movedDown = newPosition > oldPosition;
    const newTasks = categoryTasks.map((task) => {
      if (task.id === active.id) {
        return { ...task, position: newPosition };
      }
      if (movedDown && task.position <= newPosition) {
        return { ...task, position: task.position - 1 };
      }
      if (!movedDown && task.position >= newPosition) {
        return { ...task, position: task.position + 1 };
      }
      return task;
    });
    const newCategories = categories.map((item) =>
      item.id === active.data.current.category
        ? { ...item, tasks: newTasks }
        : item
    );
    set(categoriesAtom, newCategories);
  }
);

export const moveTaskToADifferentCategoryAtom = atom(
  null,
  (get, set, active, over) => {
    const categories = get(categoriesAtom);
    const activeTask = categories
      .find((item) => item.id === active.data.current.category)
      .tasks.find((task) => task.id === active.id);
    const newCategories = categories.map((category) => {
      const isNewCategory = category.id === over.data.current.category;
      const isOldCategory = category.id === active.data.current.category;
      if (isNewCategory) {
        const newPosition = over.data.current.position;
        const newTasks = category.tasks.map((task) => {
          if (task.position >= newPosition) {
            return { ...task, position: task.position + 1 };
          }
          return task;
        });
        newTasks.push({
          ...activeTask,
          position: newPosition,
          category: over.data.current.category,
        });
        return { ...category, tasks: newTasks };
      }
      if (isOldCategory) {
        const newTasks = category.tasks.filter((task) => task.id !== active.id);
        return { ...category, tasks: newTasks };
      }
      return category;
    });
    set(categoriesAtom, newCategories);
  }
);

export const moveTaskAtTheTopOfACategoryAtom = atom(
  null,
  (get, set, active, over) => {
    const categories = get(categoriesAtom);
    const activeTask = categories
      .find((item) => item.id === active.data.current.category)
      .tasks.find((task) => task.id === active.id);
    const newCategories = categories.map((category) => {
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
        return { ...category, tasks: newTasks };
      }
      if (isOldCategory) {
        const newTasks = category.tasks.filter((task) => task.id !== active.id);
        return { ...category, tasks: newTasks };
      }
      return category;
    });
    set(categoriesAtom, newCategories);
  }
);

export const createCategoryAtom = atom(null, (get, set, category) => {
  const categories = get(categoriesAtom);
  const newCategories = [...categories];
  newCategories.push({
    ...category,
    position: newCategories.length + 1,
    tasks: [],
  });
  set(categoriesAtom, newCategories);
});

export const createTaskAtom = atom(null, (get, set, task) => {
  const categories = get(categoriesAtom);
  const newCategories = categories.map((category) => {
    if (category.id === task.category) {
      const newTasks = [...category.tasks];
      newTasks.push({
        ...task,
        position: newTasks.length + 1,
      });
      return { ...category, tasks: newTasks };
    }
    return category;
  });
  set(categoriesAtom, newCategories);
});
