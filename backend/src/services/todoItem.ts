import { TodoItemPriority, TodoItemStatus } from '../enums';
import { ITodoItem, TodoItem } from '../models';
import { addDays, addWeeks, addMonths } from 'date-fns';

/**
 * Create a new TodoItem
 */
export const createTodo = async (
  data: Pick<ITodoItem, 'title' | 'description' | 'dueAt' | 'priority'>,
): Promise<ITodoItem> => {
  const todo = new TodoItem(data);
  return await todo.save();
};

/**
 * Get all TodoItems
 */
export const getAllTodos = async (
  sortBy: string = 'createdAt',
  sortOrder: 'asc' | 'desc' = 'desc',
): Promise<ITodoItem[]> => {
  const order = sortOrder === 'asc' ? 1 : -1;

  if (sortBy === 'priority') {
    return await TodoItem.aggregate([
      {
        $addFields: {
          priorityValue: {
            $switch: {
              branches: [
                { case: { $eq: ['$priority', TodoItemPriority.LOW] }, then: 1 },
                {
                  case: { $eq: ['$priority', TodoItemPriority.MEDIUM] },
                  then: 2,
                },
                {
                  case: { $eq: ['$priority', TodoItemPriority.HIGH] },
                  then: 3,
                },
              ],
              default: 0,
            },
          },
        },
      },
      { $sort: { priorityValue: order } },
      { $project: { priorityValue: 0 } },
    ]);
  } else if (sortBy === 'status') {
    return await TodoItem.aggregate([
      {
        $addFields: {
          statusValue: {
            $switch: {
              branches: [
                { case: { $eq: ['$status', TodoItemStatus.DONE] }, then: 1 },
                {
                  case: { $eq: ['$status', TodoItemStatus.NOT_DONE] },
                  then: 2,
                },
              ],
              default: 0,
            },
          },
        },
      },
      { $sort: { statusValue: order } },
      { $project: { statusValue: 0 } },
    ]);
  } else {
    return await TodoItem.find().sort({ [sortBy]: order });
  }
};

/**
 * Get a single TodoItem by ID
 */
export const getTodoById = async (id: string): Promise<ITodoItem | null> => {
  return await TodoItem.findById(id);
};

/**
 * Update a TodoItem
 */
export const updateTodo = async (
  id: string,
  data: Partial<
    Pick<ITodoItem, 'title' | 'description' | 'dueAt' | 'priority' | 'status'>
  >,
): Promise<ITodoItem | null> => {
  const todo = await TodoItem.findById(id);
  // Block updates if status is "done"
  if (todo?.status === TodoItemStatus.DONE) {
    throw new Error('Cannot update this TodoItem');
  }
  return await TodoItem.findByIdAndUpdate(id, data, { new: true });
};

/**
 * Delete a TodoItem
 */
export const deleteTodo = async (id: string): Promise<ITodoItem | null> => {
  return await TodoItem.findByIdAndDelete(id);
};

/**
 * Set a dependency for a TodoItem
 */
export const setTodoDependency = async (
  id: string,
  dependencyId: string,
): Promise<ITodoItem | null> => {
  return await TodoItem.findByIdAndUpdate(
    id,
    { $addToSet: { dependencies: dependencyId } },
    { new: true },
  );
};

/**
 * Remove a single dependency from a TodoItem
 */
export const removeTodoDependency = async (
  id: string,
  dependencyId: string,
): Promise<ITodoItem | null> => {
  return await TodoItem.findByIdAndUpdate(
    id,
    { $pull: { dependencies: dependencyId } },
    { new: true },
  );
};
export const handleRecurringTasks = async () => {
  const recurringTasks = await TodoItem.find({ isRecurring: true });

  for (const task of recurringTasks) {
    let nextDueAt: Date | undefined = undefined;

    if (task.recurringInterval === 'daily') {
      nextDueAt = addDays(new Date(task.dueAt!), 1);
    } else if (task.recurringInterval === 'weekly') {
      nextDueAt = addWeeks(new Date(task.dueAt!), 1);
    } else if (task.recurringInterval === 'monthly') {
      nextDueAt = addMonths(new Date(task.dueAt!), 1);
    }

    if (nextDueAt) {
      const newTask = {
        ...task.toObject(),
        dueAt: nextDueAt,
        createdAt: new Date(),
      };
      delete newTask._id;
      await createTodo(newTask);
    }
  }
};
