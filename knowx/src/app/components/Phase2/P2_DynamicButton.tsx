import React from "react";

interface P2_DynamicButtonProps {
  children: JSX.Element;
  function: () => void;
}

export const P2_DynamicButton = (props: P2_DynamicButtonProps) => {
  return (
    <button
      className="text-black text-4xl p-1 h-full aspect-square bg-white rounded-full text-center absolute right-0"
      onClick={() => {
        props.function();
        // setNewFeature("");
        // addCategory(newFeature);
      }}
    >
      {props.children}
    </button>
  );
};
