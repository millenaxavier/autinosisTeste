// FormInput.tsx
"use client";

import React from "react";
import type { FormInputProps } from "@/components/forms/types";

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  options = [],
  required = true,
}) => {
  const baseStyles =
    "w-full p-3 border border-gray-300 rounded-md shadow-sm transition ease-in-out duration-150 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400";

  return (
    <div className="mb-6">
      <label htmlFor={name} className="mb-2 block font-semibold text-gray-700">
        {label}
      </label>
      {type === "select" ? (
        <select
          id={name}
          className={baseStyles}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          required={required}
        >
          <option value="">Selecione uma opção</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          className={baseStyles}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          required={required}
        />
      )}
    </div>
  );
};

export default FormInput;
