"use client";
import React from "react";

interface P2_CategoryResultsProps {
  index: number;
  isSelected: boolean;
  feature: string;
  toggleCategory: (feature: string) => void;
}

export const P2_CategoryResults = ({
  index,
  isSelected,
  feature,
  toggleCategory,
}: P2_CategoryResultsProps) => {
  return (
    <button
      key={index}
      className={`text-xl rounded-xl py-3 px-8 text-wrap text-ellipsis overflow-hidden ${
        isSelected
          ? "bg-purple-500 transition duration-100 ease-in-out"
          : "bg-white hover:bg-purple-300 transition duration-100 ease-in-out"
      }`}
      onClick={() => toggleCategory(feature)}
    >
      <div className="text-black text-xl font-bold text-center">{feature}</div>
    </button>
  );
};
