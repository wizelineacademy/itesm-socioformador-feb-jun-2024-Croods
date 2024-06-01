import React from "react"

interface P2_DynamicButtonProps {
  children: JSX.Element
  function: () => void
}

export const P2_DynamicButton = (props: P2_DynamicButtonProps) => {
  return (
    <button
      className="absolute right-0 aspect-square h-full rounded-full bg-white p-1 text-center text-4xl text-black"
      onClick={() => {
        props.function()
        // setNewFeature("");
        // addCategory(newFeature);
      }}
    >
      {props.children}
    </button>
  )
}
