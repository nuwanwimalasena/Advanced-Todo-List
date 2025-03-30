import React, { useState } from "react";
export interface DateSelectorProps {
  onDateChange: (date: string) => void;
}
const DateSelector = ({ onDateChange }: DateSelectorProps) => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event: { target: { value: any } }) => {
    const date = event.target.value;
    setSelectedDate(date);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  return (
    <div>
      <label htmlFor="date-picker" style={{ marginRight: "8px" }}>
        Select Date:
      </label>
      <input
        id="date-picker"
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
};

export default DateSelector;
