import api from "./axios";

export type Category = {
  id: string;
  name: string;
  description?: string;
};

export async function getCategories() {
  return api.get<Category[]>("/categories");
}

export async function createCategory(data: { name: string; description?: string }) {
  return api.post("/categories", data);
}

export async function updateCategory(
  id: string,
  data: { name?: string; description?: string }
) {
  return api.patch(`/categories/${id}`, data);
}


export async function deleteCategory(id: string) {
  return api.delete(`/categories/${id}`);
}