"use client";
import React from "react";
import { addCategory } from "@/app/actions/search";
import { useState } from "react";
import { navigateToPhase3 } from "@/app/actions/redirect";

import { P2_DynamicButton } from "./P2_DynamicButton";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const P2_NewCategory = () => {
  const [newFeature, setNewFeature] = useState("");
  return (
    <div className="flex mt-5 w-fit items-center justify-center relative">
      <input
        name=""
        className="bg-black dark:bg-backgroundLight rounded-lg text-white dark:text-black text-base py-3 text-center align-center mx-[60px]"
        onChange={(e) => setNewFeature(e.target.value)}
        value={newFeature}
        placeholder="Type new category"
      ></input>
      <P2_DynamicButton
        function={
          newFeature !== ""
            ? () => {
                addCategory(newFeature);
                setNewFeature("");
              }
            : () => {
                navigateToPhase3();
              }
        }
      >
        {newFeature !== "" ? <PlusIcon /> : <MagnifyingGlassIcon />}
      </P2_DynamicButton>
    </div>
  );
};

export default P2_NewCategory;
