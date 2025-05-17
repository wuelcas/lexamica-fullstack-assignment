export const createCategory = async (category) => {
  const res = await fetch("http://localhost:3001/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  if (!res.ok) throw new Error("Failed to create category");
  const data = await res.json();
  return data;
};

export const updateCategory = async (category) => {
  delete category.tasks;
  const res = await fetch(`http://localhost:3001/categories/${category.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  if (!res.ok) throw new Error("Failed to update category");
};

export const getCategories = async () => {
  const res = await fetch("http://localhost:3001/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data.categories;
};
