import { Request, Response, NextFunction } from 'express';
import { todoItemsService } from '../services';

// Create an item
export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, dueAt, priority } = req.body;
    const newItem = await todoItemsService.createTodo({
      title,
      description,
      dueAt,
      priority,
    });
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

// Read all items
export const getItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const items = await todoItemsService.getAllTodos(req.query.sortBy as string);
    res.json(items);
  } catch (error) {
    next(error);
  }
};

// Read single item
export const getItemById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const item = await todoItemsService.getTodoById(id);
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};

// Update an item
export const updateItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const { title, description, dueAt, priority } = req.body;
    const item = await todoItemsService.updateTodo(id, {
      title,
      description,
      dueAt,
      priority,
    });
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.json(item);
  } catch (error: any) {
    if (error.message === 'Cannot update this TodoItem') {
      res.status(400).json({ message: error.message });
      return;
    }
    next(error);
  }
};

// Delete an item
export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const item = await todoItemsService.deleteTodo(id);
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};
