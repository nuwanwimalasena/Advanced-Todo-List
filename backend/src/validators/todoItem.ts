import { body, param } from "express-validator";

export const validateCreateTodoItem = [
  body("title").isString().notEmpty().withMessage("Title is required"),
  body("description").isString().optional(),
  body("dueAt").isISO8601().withMessage("Invalid date format"),
  body("priority").isIn(["low", "medium", "high"]).withMessage("Invalid priority"),
];

export const validateUpdateTodoItem = [
  param("id").isMongoId().withMessage("Invalid TodoItem ID"),
  body("title").optional().isString().notEmpty().withMessage("Title must be a string"),
  body("description").optional().isString(),
  body("dueAt").optional().isISO8601().withMessage("Invalid date format"),
  body("status").optional().isIn(["pending", "in-progress", "done"]).withMessage("Invalid status"),
  body("priority").optional().isIn(["low", "medium", "high"]).withMessage("Invalid priority"),
];

export const validateTodoItemId = [
  param("id").isMongoId().withMessage("Invalid TodoItem ID"),
];