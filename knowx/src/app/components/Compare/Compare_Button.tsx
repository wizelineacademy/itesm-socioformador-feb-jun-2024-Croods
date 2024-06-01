"use client"
import React from "react"
import { Button } from "@nextui-org/react"
import { backToPhase3 } from "@/app/actions/redirect"

export const Compare_Button = () => {
  return (
    <Button
      variant="flat"
      color="success"
      className="mx-auto my-5 w-[200px] rounded-xl p-5"
      onClick={() => backToPhase3()}
    >
      {"Back"}
    </Button>
  )
}
