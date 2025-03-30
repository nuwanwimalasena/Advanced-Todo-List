export interface CardContentProps {
  children: React.ReactNode;
}
const cardContentStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  marginTop: "10px"
};
const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <div style={cardContentStyles}>{children}</div>;
};
export default CardContent;
