"use client";

// Hooks
import { useState } from "react";

// Tipos
import type { Field } from "@/lib/types";
import { EyeOffIcon } from "@/components/Icons";

export function Field({
  name,
  label,
  type,
  placeholder,
  icon: Icon,
  value,
  onChange,
}: Field) {
  // Estados
  const [seePassword, setSeePassword] = useState(false);

  const handleVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    setSeePassword(!seePassword);
  };

  return (
    <label className="flex flex-col gap-1 items-start relative">
      <span className="text-lg font-medium">{label}</span>
      <input
        className="px-4 py-3 bg-electric-blue w-full rounded-lg placeholder:text-neutral-400
        focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        type={seePassword && name === "password" ? "text" : type}
        name={name}
        placeholder={
          seePassword && name === "password" ? "Contraseña" : placeholder
        }
        required
        value={value}
        onChange={onChange}
      />
      {Icon && (
        <button
          type="button"
          className="absolute right-4 bottom-0 transform -translate-y-1/2 text-neutral-400"
          onClick={name === "password" ? handleVisibility : undefined}
        >
          {seePassword ? <EyeOffIcon /> : <Icon />}
        </button>
      )}
    </label>
  );
}
