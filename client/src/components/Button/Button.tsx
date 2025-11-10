import React, { useState } from "react";
import "./Button.css";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  disabled = false,
  onClick,
}) => {
  const [focused, setFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === "Enter") {
      e.preventDefault();
      (e.target as HTMLElement).click(); 
    }
  };

  return (
    <div
      className={
        "my-btn " +
        (disabled ? "disabled " : "") +
        (focused ? "focused " : "")
      }
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={(e) => {
        if (!disabled) onClick?.(e);
      }}
      onKeyDown={handleKeyDown}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {label}
    </div>
  );
};
