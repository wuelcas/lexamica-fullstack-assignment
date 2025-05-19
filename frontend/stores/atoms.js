import { atom } from "jotai";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/categories";
import { createTask, updateTask, deleteTask } from "../api/tasks";
import inBetween from "../utils/inBetween";

export const categoriesAtom = atom([]);

export const moveCategoryPositionAtom = atom(
  null,
  async (get, set, active, over) => {
    const categories = get(categoriesAtom);
    const oldPosition = active.data.current.position;
    const newPosition = over.data.current.position;

    const categoryToUpdate = categories.find(
      (category) => category.id === active.id
    );

    await updateCategory({
      ...categoryToUpdate,
      position: newPosition,
    });

    const movedToRight = newPosition > oldPosition;
    const newCategories = categories.map((category) => {
      if (category.id === active.id) {
        return { ...category, position: newPosition };
      }
      if (
        movedToRight &&
        inBetween(category.position, oldPosition, newPosition)
      ) {
        return { ...category, position: category.position - 1 };
      }
      if (
        !movedToRight &&
        inBetween(category.position, newPosition, oldPosition)
      ) {
        return { ...category, position: category.position + 1 };
      }
      return category;
    });
    set(categoriesAtom, newCategories);
  }
);

export const moveTaskPositionInSameCategoryAtom = atom(
  null,
  async (get, set, active, over) => {
    const categories = get(categoriesAtom);
    const categoryTasks = [
      ...categories.find((item) => item.id === active.data.current.category)
        .tasks,
    ];
    const oldPosition = active.data.current.position;
    const newPosition = over.data.current.position;

    const taskToUpdate = categoryTasks.find((task) => task.id === active.id);
    await updateTask({
      ...taskToUpdate,
      position: newPosition,
    });

    const movedDown = newPosition > oldPosition;
    const newTasks = categoryTasks.map((task) => {
      if (task.id === active.id) {
        return { ...task, position: newPosition };
      }
      if (movedDown && inBetween(task.position, oldPosition, newPosition)) {
        return { ...task, position: task.position - 1 };
      }
      if (!movedDown && inBetween(task.position, newPosition, oldPosition)) {
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
  async (get, set, active, over) => {
    const categories = get(categoriesAtom);
    const activeTask = categories
      .find((item) => item.id === active.data.current.category)
      .tasks.find((task) => task.id === active.id);
    const newPosition = over.data.current.position;

    await updateTask({
      ...activeTask,
      position: newPosition,
      category: over.data.current.category,
    });

    const newCategories = categories.map((category) => {
      const isNewCategory = category.id === over.data.current.category;
      const isOldCategory = category.id === active.data.current.category;
      if (isNewCategory) {
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
        const newTasks = category.tasks
          .filter((task) => task.id !== active.id)
          .map((task) => {
            if (task.position >= oldPosition) {
              return { ...task, position: task.position - 1 };
            }
            return task;
          });
        return { ...category, tasks: newTasks };
      }
      return category;
    });
    set(categoriesAtom, newCategories);
  }
);

export const moveTaskAtTheTopOfACategoryAtom = atom(
  null,
  async (get, set, active, over) => {
    const categories = get(categoriesAtom);
    const activeTask = categories
      .find((item) => item.id === active.data.current.category)
      .tasks.find((task) => task.id === active.id);

    await updateTask({
      ...activeTask,
      position: 1,
      category: over.id,
    });

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

export const createCategoryAtom = atom(null, async (get, set, category) => {
  const newCategory = await createCategory(category);
  const categories = get(categoriesAtom);

  set(categoriesAtom, [...categories, { ...newCategory, tasks: [] }]);
});

export const createTaskAtom = atom(null, async (get, set, task) => {
  const newTask = await createTask(task);
  const categories = get(categoriesAtom);
  const newCategories = categories.map((item) =>
    item.id === newTask.category
      ? { ...item, tasks: [...item.tasks, newTask] }
      : item
  );
  set(categoriesAtom, newCategories);
});

export const deleteCategoryAtom = atom(null, async (get, set, category) => {
  await deleteCategory(category.id);
  const categories = get(categoriesAtom);
  const newCategories = categories.filter((item) => item.id !== category.id);
  set(categoriesAtom, newCategories);
});

export const deleteTaskAtom = atom(null, async (get, set, task) => {
  await deleteTask(task.id);
  const categories = get(categoriesAtom);
  const newCategories = categories.map((item) =>
    item.id === task.category
      ? { ...item, tasks: item.tasks.filter((item) => item.id !== task.id) }
      : item
  );
  set(categoriesAtom, newCategories);
});

export const updateCategoryNameAtom = atom(null, async (get, set, category) => {
  await updateCategory(category);
  const categories = get(categoriesAtom);
  const newCategories = categories.map((item) =>
    item.id === category.id ? { ...item, name: category.name } : item
  );
  set(categoriesAtom, newCategories);
});

export const updateTaskNameAtom = atom(null, async (get, set, task) => {
  await updateTask(task);
  const categories = get(categoriesAtom);
  const newCategories = categories.map((item) =>
    item.id === task.category
      ? {
          ...item,
          tasks: item.tasks.map((item) =>
            item.id === task.id ? { ...item, name: task.name } : item
          ),
        }
      : item
  );
  set(categoriesAtom, newCategories);
});
