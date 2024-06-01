"use client"
import React from "react"

import { Button } from "@nextui-org/react"
import { navigateToCompare } from "@/app/actions/redirect"

const P3_CompareButton = () => {
  return (
    <Button
      variant="flat"
      color="success"
      className="mx-auto my-5 w-[200px] rounded-xl p-5"
      onClick={() => navigateToCompare()}
    >
      Compare
    </Button>
  )
}

export default P3_CompareButton
