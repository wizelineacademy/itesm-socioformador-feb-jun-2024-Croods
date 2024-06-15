"use client"
import { Button } from "@nextui-org/react"
import React, { useState } from "react"

interface P2_DynamicButtonProps {
  children: JSX.Element
  function: () => void
  goingBack: boolean
  // icon: JSX.Element
}

export const P2_DynamicButton = (props: P2_DynamicButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <Button
      isLoading={isLoading}
      title="submitButton"
      id="submitButton"
      className="absolute right-0 aspect-square h-full rounded-full bg-white p-1 text-center text-4xl text-black"
      onClick={() => {
        setIsLoading(true)
        props.function()
        if (props.goingBack) setIsLoading(false)
        // setNewFeature("");
        // addCategory(newFeature);
      }}
    >
      {!isLoading && props.children}
    </Button>
  )
}
