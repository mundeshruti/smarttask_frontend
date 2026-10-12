
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all tasks
export const getTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

// Create a task
export const createTask = async (task) => {
  const response = await api.post("/tasks", task);
  return response.data;
};

// Update an existing task
export const updateTask = async (id, changes) => {
  const response = await api.put(`/tasks/${id}`, changes);
  return response.data;
};

// Delete a task
export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
};

export default api;
