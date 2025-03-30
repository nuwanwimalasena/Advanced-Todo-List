import React from "react";

export interface CardProps {
  children: React.ReactNode;
}
const cardStyles: React.CSSProperties = {
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  padding: "16px",
  backgroundColor: "#ffffff",
  marginBottom: '20px'
};
const Card: React.FC<CardProps> = ({ children }) => {
  return <div style={cardStyles}>{children}</div>;
};
export default Card;
