import React from "react";
export interface PriorityLabelProps {
  priority: "high" | "medium" | "low";
}
const PriorityLabel = ({ priority }: PriorityLabelProps) => {
  let labelStyle = {};
  let labelText = "";

  switch (priority) {
    case "high":
      labelStyle = { backgroundColor: "#BF3131", color: "white" };
      labelText = "High";
      break;
    case "medium":
      labelStyle = { backgroundColor: "orange", color: "white" };
      labelText = "Medium";
      break;
    case "low":
      labelStyle = { backgroundColor: "yellow", color: "white" };
      labelText = "Low";
      break;
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

export default PriorityLabel;
