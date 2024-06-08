"use client"
import React from "react"
import { Button } from "@nextui-org/react"
import { backToPhase3 } from "@/actions/redirect"
import { useRouter } from "next/navigation"

export const Compare_Button = ({
  isHistory = false,
}: {
  isHistory?: boolean
}) => {
  const router = useRouter()

  return (
    <Button
      variant="flat"
      color="success"
      className="mx-auto my-5 w-[200px] rounded-xl p-5"
      onClick={() => {
        !isHistory ? backToPhase3() : router.back()
      }}
    >
      {"Back"}
    </Button>
  )
}
