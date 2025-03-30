export type TodoItem = {
  title: string;
  description: string;
  status?: "not-done" | "done";
  priority: "low" | "medium" | "high";
  isRecurring: boolean;
  dueAt?: string;
  recurringInterval?: "daily" | "weekly" | "monthly";
};
