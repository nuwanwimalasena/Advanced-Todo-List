import React from "react";
export interface StatusLabelProps {
  status: "done" | "not-done";
}
const StatusLabel = ({ status }: StatusLabelProps) => {
  let labelStyle = {};
  let labelText = "";

  // Set styles and text based on the status
  switch (status) {
    case "done":
      labelStyle = { backgroundColor: "green", color: "white" };
      labelText = "Done";
      break;
    case "not-done":
      labelStyle = { backgroundColor: "orange", color: "white" };
      labelText = "Not Done";
      break;
    default:
      labelStyle = { backgroundColor: "gray", color: "white" };
      labelText = "Unknown";
  }

  return (
    <span
      style={{
        ...labelStyle,
        padding: "3px 10px",
        borderRadius: "5px",
        fontWeight: "bold",
        textTransform: "uppercase",
      }}
    >
      {labelText}
    </span>
  );
};

export default StatusLabel;
