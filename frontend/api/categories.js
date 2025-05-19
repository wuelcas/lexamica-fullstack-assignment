import { apiFetch } from "./apiClient";
export const createCategory = async (category) => {
  const data = await apiFetch("categories", {
    method: "POST",
    body: JSON.stringify(category),
  });
  return data;
};

export const updateCategory = async (category) => {
  const cat = { ...category };
  delete cat.tasks;
  await apiFetch(`categories/${cat.id}`, {
    method: "PUT",
    body: JSON.stringify(cat),
  });
};

export const getCategories = async () => {
  const data = await apiFetch("categories");
  return data.categories;
};

export const deleteCategory = async (id) => {
  await apiFetch(`categories/${id}`, {
    method: "DELETE",
  });
};
