"use client"
import React from "react"

interface P2_CategoryResultsProps {
  index: number
  isSelected: boolean
  feature: string
  toggleCategory: (feature: string) => void
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
      className={`overflow-hidden text-ellipsis text-wrap rounded-xl px-8 py-3 text-xl ${
        isSelected
          ? "bg-purple-500 transition duration-100 ease-in-out"
          : "bg-white transition duration-100 ease-in-out hover:bg-purple-300"
      }`}
      onClick={() => toggleCategory(feature)}
    >
      <div className="text-center text-xl font-bold text-black">{feature}</div>
    </button>
  )
}
