"use client";
import React from "react";
import { addCategory } from "@/app/actions/search";

const P2_NewCategory = () => {
  let newFeature = "";
  return (
    <div className="mt-5 flex w-full items-center justify-center ">
      <input
        name=""
        className="rounded-lg bg-black py-3 text-center text-base text-white dark:bg-backgroundLight dark:text-black"
        onChange={(e) => (newFeature = e.target.value)}
        // value={newFeature}
      ></input>
      <button
        className="pl-4 pr-1 text-4xl text-black dark:text-white"
        onClick={() => addCategory(newFeature)}
      ></button>
    </div>
  );
};

export default P2_NewCategory;
