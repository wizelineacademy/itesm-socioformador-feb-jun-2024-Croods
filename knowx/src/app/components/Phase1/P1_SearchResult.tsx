import React from "react";
import { P1_SearchResultProps } from "../../interfaces";
import { useState } from "react";

const P1_SearchResult = (props: P1_SearchResultProps) => {
  const [selected, setSelected] = useState(false);

  const toggleSelect = () => {
    setSelected(!selected);
    props.willSearch(props.index, props.content);
  };

  return (
    <div
      key={`${props.index}`}
      className={` w-[250px] h-[100px] rounded-lg m-10 p-10 ${
        !selected
          ? "bg-white hover:bg-purple-300 transition duration-100 ease-in-out"
          : "bg-purple-500 transition duration-100 ease-in-out"
      }`}
      onClick={toggleSelect}
    >
      <div className="text-black text-xl font-bold text-center">
        {props.content}
      </div>
    </div>
  );
};

export default P1_SearchResult;
