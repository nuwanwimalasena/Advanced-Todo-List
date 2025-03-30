import mongoose, { Schema, Document } from 'mongoose';
import { TodoItemPriority, TodoItemReccuringInterval, TodoItemStatus } from '../enums';

// Define the User interface
export interface ITodoItem extends Document {
  title: string;
  description: string;
  dueAt?: Date;
  recurringInterval?: TodoItemReccuringInterval,
  status: TodoItemStatus;
  priority: TodoItemPriority;
  createdAt: Date;
  updatedAt: Date;
  isRecurring: boolean;
  dependencies?: string[];
}

// Define the schema
const TodoItemSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    dueAt: { type: Date, required: false },
    status: {
      type: String,
      enum: Object.values(TodoItemStatus),
      default: TodoItemStatus.NOT_DONE,
    },
    priority: {
      type: String,
      enum: Object.values(TodoItemPriority),
      default: TodoItemPriority.MEDIUM,
    },
    recurringInterval: {
      type: String,
      enum: Object.values(TodoItemReccuringInterval),
      default: TodoItemReccuringInterval.DAILY,
      required: false,
    },
    isRecurring: { type: Boolean, default: false },
    dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TodoItem' }],
  },
  { timestamps: true },
);

// Create and export the model
const TodoItem = mongoose.model<ITodoItem>('TodoItem', TodoItemSchema);
export default TodoItem;
