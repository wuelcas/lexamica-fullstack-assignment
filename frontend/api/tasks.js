import { apiFetch } from "./apiClient";

export const createTask = async (task) => {
  const data = await apiFetch("tasks", {
    method: "POST",
    body: JSON.stringify(task),
  });
  return data;
};

export const updateTask = async (task) => {
  await apiFetch(`tasks/${task.id}`, {
    method: "PUT",
    body: JSON.stringify(task),
  });
};

export const deleteTask = async (id) => {
  await apiFetch(`tasks/${id}`, {
    method: "DELETE",
  });
};
