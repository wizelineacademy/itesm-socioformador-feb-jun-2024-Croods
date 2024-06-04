"use client"
import React from "react"

import { Button } from "@nextui-org/react"
import {
  navigateToCompare,
  navigateToHistoryCompare,
} from "@/app/actions/redirect"
import { loadResultsCookie } from "@/app/actions/search"

const P3_CompareButton = ({
  isHistory = false,
  history = "",
}: {
  isHistory?: boolean
  history?: string
}) => {
  return (
    <Button
      variant="flat"
      color="success"
      className="mx-auto my-5 w-[200px] rounded-xl p-5"
      onClick={() => {
        !isHistory ? navigateToCompare() : loadResultsCookie(history),
          navigateToHistoryCompare()
      }}
    >
      Compare
    </Button>
  )
}

export default P3_CompareButton
