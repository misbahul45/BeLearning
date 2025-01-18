import React, { useState } from "react";

interface MoneyInputProps {
  value: string;
  onChange: (formattedValue: string, rawValue: number) => void;
  placeholder?: string;
}

const MoneyInput: React.FC<MoneyInputProps> = ({ value, onChange, placeholder }) => {
  const [rawValue, setRawValue] = useState<number>(0);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, "");
    const parsedValue = parseFloat(inputValue) || 0;

    setRawValue(parsedValue);
    const formattedValue = formatCurrency(parsedValue);
    onChange(formattedValue, parsedValue);
  };

  return (
    <input
      type="text"
      value={rawValue ? formatCurrency(rawValue) : value}
      onChange={handleInputChange}
      placeholder={placeholder || "Enter amount"}
      className="border p-2 rounded-md w-full"
    />
  );
};

export default MoneyInput;
