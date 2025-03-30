import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "./api/todoItems";
import Card from "./components/Card";
import CardContent from "./components/CardContent";
import StatusLabel from "./components/StatusLabel";
import PriorityLabel from "./components/PriorityLabel";
import AddTodoItem from "./components/AddTodoItem";
import UpdateTodoItem from "./components/UpdateTodoItem";

const App = () => {
  const [sortBy, setSortBy] = useState("priority");
  const {
    data: todos,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["todo-items"],
    queryFn: () => getTodos(sortBy),
  });
  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };
  useEffect(() => {
    refetch();
  }, [refetch, sortBy]);
  return (
    <div
      style={{
        maxWidth: "32rem",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "1.5rem",
      }}
    >
      <h1
        style={{
          fontSize: "1.25rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          padding: "5px",
        }}
      >
        Advanced Todo App
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          minWidth: "400px",
          padding: "5px",
        }}
      >
        <select
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
          value={sortBy}
          onChange={handleSortBy}
        >
          <option value="priority">Sort by Priority</option>
          <option value="status">Sort by Status</option>
        </select>
        <AddTodoItem />
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div
          style={{
            marginTop: "1rem",
            marginBottom: "0.5rem",
            marginLeft: "0.5rem",
            marginRight: "0.5rem",
          }}
        >
          {todos?.map((todo: any) => (
            <Card key={todo._id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #e0e0e0",
                  paddingBottom: "8px",
                }}
              >
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#333",
                    width: "100%",
                  }}
                >
                  {todo.title}
                </h2>
                <UpdateTodoItem id={todo._id} />
              </div>
              <CardContent>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#555",
                    marginBottom: "6px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <strong style={{ color: "#333" }}>Description:</strong>
                  {todo.description}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#555",
                    marginBottom: "6px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <strong style={{ color: "#333" }}>Due:</strong>
                  {new Date(todo.dueAt).toLocaleDateString()}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#555",
                    marginBottom: "6px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <strong style={{ color: "#333" }}>Status:</strong>
                  <StatusLabel status={todo.status} />
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#555",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <strong style={{ color: "#333" }}>Priority:</strong>
                  <PriorityLabel priority={todo.priority} />
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
export default App;
