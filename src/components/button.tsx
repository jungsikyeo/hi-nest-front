import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    className={`w-full text-sm font-sm focus:outline-none text-white py-3 rounded-3xl transition-colors ${
      canClick
        ? actionText === "삭제하기"
          ? "bg-red-500 hover:bg-red-400"
          : "bg-green-500 hover:bg-green-400"
        : actionText === "삭제하기"
        ? "bg-red-600 bg-opacity-80 hover:bg-red-400"
        : "bg-green-600 bg-opacity-80 hover:bg-green-400"
    }`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);
