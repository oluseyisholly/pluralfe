import React from "react";

export default function Button({
  text = "Add new patient",
  onClick,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  disabled = false,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[16px] leading-[22px] px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {/* Left icon (optional) */}
      {LeftIcon && <LeftIcon className="w-5 h-5" />}

      <span>{text}</span>

      {/* Right icon (optional) */}
      {RightIcon && <RightIcon className="w-5 h-5" />}
    </button>
  );
}
