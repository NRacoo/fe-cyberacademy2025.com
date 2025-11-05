"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface AuthFormFieldProps {
  label: string;
  id: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function LoginFormField({
  label,
  id,
  type,
  name,
  placeholder,
  value,
  onChange,
}: AuthFormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1 relative">
      <label htmlFor={id} className="text-sm font-medium text-white">
        {label}:
      </label>

      <div className="relative">
        <input
          id={id}
          name={name}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 bg-black border-2 border-[#B3005E] text-white placeholder-gray-500 focus:outline-none focus:border-[#FF1493] transition duration-300 font-pixel"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
