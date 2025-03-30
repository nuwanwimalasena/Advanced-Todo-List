import { Router } from 'express';
import { todoItemController } from '../controllers';
import {
  validateTodoItemId,
  validateCreateTodoItem,
  validateUpdateTodoItem,
} from '../validators';
import { validate } from '../middlewares/validate';

const router = Router();
router.get('/', todoItemController.getItems);
router.get('/:id', todoItemController.getItemById);
router.post(
  '/',
  validateCreateTodoItem,
  validate,
  todoItemController.createItem,
);
router.put(
  '/:id',
  validateUpdateTodoItem,
  validate,
  todoItemController.updateItem,
);
router.delete(
  '/:id',
  validateTodoItemId,
  validate,
  todoItemController.deleteItem,
);

export default router;
