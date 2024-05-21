"use client";
import React from "react";
import { addCategory } from "@/app/actions/search";

const P2_NewCategory = () => {
  let newFeature = "";
  return (
    <div className="flex mt-5 w-full items-center justify-center ">
      <input
        name=""
        className="bg-black dark:bg-backgroundLight rounded-lg text-white dark:text-black text-base py-3 text-center"
        onChange={(e) => (newFeature = e.target.value)}
        // value={newFeature}
      ></input>
      <button
        className="text-black dark:text-white text-4xl pl-4 pr-1"
        onClick={() => addCategory(newFeature)}
      ></button>
    </div>
  );
};

export default P2_NewCategory;
