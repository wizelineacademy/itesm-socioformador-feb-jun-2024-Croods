"use client"
import React from "react"
import { addCategory } from "@/app/actions/search"
import { useState } from "react"
import { navigateToPhase3 } from "@/app/actions/redirect"

import { P2_DynamicButton } from "./P2_DynamicButton"
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid"

const P2_NewCategory = () => {
  const [newFeature, setNewFeature] = useState("")
  return (
    <div className="relative mt-5 flex w-fit items-center justify-center">
      <input
        name=""
        className="align-center mx-[60px] rounded-lg bg-black py-3 text-center text-base text-white dark:bg-backgroundLight dark:text-black"
        onChange={(e) => setNewFeature(e.target.value)}
        value={newFeature}
        placeholder="Type new category"
      ></input>
      <P2_DynamicButton
        function={
          newFeature !== ""
            ? () => {
                addCategory({ obj: newFeature, isAdded: true })
                setNewFeature("")
              }
            : () => {
                navigateToPhase3()
              }
        }
      >
        {newFeature !== "" ? <PlusIcon /> : <MagnifyingGlassIcon />}
      </P2_DynamicButton>
    </div>
  )
}

export default P2_NewCategory
