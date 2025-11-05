"use client";

import type React from "react";

interface AuthFormFieldProps {
  label: string;
  id: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export function AuthFormField({
  label,
  id,
  type,
  name,
  placeholder,
  value,
  onChange,
  required = true,
}: AuthFormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-white text-sm ">
        {label}:
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 bg-black border-2 border-[#B3005E] text-white placeholder-gray-500 focus:outline-none focus:border-[#FF1493] transition duration-300 font-pixel"
      />
    </div>
  );
}
