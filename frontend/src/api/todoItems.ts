import { TodoItem } from "@/types/todoItems";
import axios from "axios";
import.meta.env.API_BASE_URL;

const API_BASE_URL =
  import.meta.env.API_BASE_URL || "http://localhost:3000/api";
const TODO_ITEMS_API_URL = `${API_BASE_URL}/todo-items`;
export const getTodos = async (sortBy: string) => {
  const response = await axios.get(`${TODO_ITEMS_API_URL}?sortBy=${sortBy}`);
  return response.data;
};

export const getTodo = async (id: string) => {
  const response = await axios.get(`${TODO_ITEMS_API_URL}/${id}`);
  return response.data;
};
export const createTodo = async (todo: TodoItem) => {
  const response = await axios.post(TODO_ITEMS_API_URL, todo);
  return response.data;
};

export const updateTodo = async (id: string, updates: Partial<TodoItem>) => {
  const response = await axios.put(`${TODO_ITEMS_API_URL}/${id}`, updates);
  return response.data;
};

export const deleteTodo = async (id: string) => {
  const response = await axios.delete(`${TODO_ITEMS_API_URL}/${id}`);
  return response.data;
};
