import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText
}) => (
  <button
    className={`text-sm font-sm focus:outline-none text-white py-3 rounded-3xl transition-colors ${
      canClick
        ? "bg-green-500 hover:bg-green-400"
        : "bg-green-600 bg-opacity-80 hover:bg-green-400"
    }`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);
