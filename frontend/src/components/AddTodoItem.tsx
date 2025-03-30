import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Modal from "./Modal";
import { createTodo } from "@/api/todoItems";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const todoSchema = z
  .object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    priority: z.enum(["low", "medium", "high"]),
    isRecurring: z.boolean().default(false),
    dueAt: z.string().optional(),
    recurringInterval: z.enum(["daily", "weekly", "monthly"]).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.isRecurring && !data.dueAt) {
      ctx.addIssue({
        path: ["dueAt"],
        message: "Due date is required if not recurring",
        code: "custom",
      });
    }

    if (data.isRecurring && !data.recurringInterval) {
      ctx.addIssue({
        path: ["recurringInterval"],
        message: "Recurring interval is required if recurring",
        code: "custom",
      });
    }
  });

type FormData = z.infer<typeof todoSchema>;

const AddTodoItem: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: { isRecurring: false },
  });
  const addTodo = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo-items"] });
      reset();
      setShowModal(false);
    },
  });

  const isRecurring = watch("isRecurring");
  return (
    <div style={{ padding: "2px", maxWidth: "500px", margin: "0 auto" }}>
      <button
        onClick={() => setShowModal(true)}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: "#27548A",
          color: "#FFF",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginLeft: "20px",
        }}
      >
        Add
      </button>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Add Todo Item"
      >
        <form
          onSubmit={handleSubmit((data) => {
            addTodo.mutate(data)
          })}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
          }}
        >
          <div>
            <label style={{ fontSize: "14px", color: "#555" }}>Title</label>
            <input
              {...register("title")}
              placeholder="Title"
              style={inputStyle}
            />
            {errors.title && <p style={errorStyle}>{errors.title.message}</p>}
          </div>

          <div>
            <label style={{ fontSize: "14px", color: "#555" }}>
              Description
            </label>
            <textarea
              {...register("description")}
              placeholder="Description"
              style={inputStyle}
            />
            {errors.description && (
              <p style={errorStyle}>{errors.description.message}</p>
            )}
          </div>
          <div>
            <label style={{ fontSize: "14px", color: "#555" }}>Priority</label>
            <select {...register("priority")} style={inputStyle}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              {...register("isRecurring")}
              style={checkboxStyle}
            />
            <span style={{ fontSize: "16px" }}>Recurring</span>
          </label>

          {isRecurring ? (
            <div>
              <label style={{ fontSize: "14px", color: "#555" }}>
                Recurring Interval
              </label>
              <select {...register("recurringInterval")} style={inputStyle} defaultValue={"daily"}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              {errors.recurringInterval && (
                <p style={errorStyle}>{errors.recurringInterval.message}</p>
              )}
            </div>
          ) : (
            <div>
              <label style={{ fontSize: "14px", color: "#555" }}>Due At</label>
              <input
                {...register("dueAt")}
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                min={new Date().toISOString().split("T")[0]}
                style={inputStyle}
              />
              {errors.dueAt && <p style={errorStyle}>{errors.dueAt.message}</p>}
            </div>
          )}
          <button type="submit" style={submitButtonStyle}>
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
};

// Reusable Styles
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  fontSize: "16px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  boxSizing: "border-box",
};

const checkboxStyle: React.CSSProperties = {
  width: "20px",
  height: "20px",
  cursor: "pointer",
  accentColor: "#007bff",
};

const submitButtonStyle: React.CSSProperties = {
  padding: "12px 24px",
  fontSize: "16px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const errorStyle: React.CSSProperties = {
  color: "red",
  fontSize: "14px",
};

export default AddTodoItem;
