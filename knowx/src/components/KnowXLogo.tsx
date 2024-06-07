"use client"

import { navigateToDashboard } from "@/actions/redirect"
import Image from "next/image"

export default function KnowXLogo({ title }: { title: string | undefined }) {
  return (
    <Image
      className={
        !title
          ? "absolute left-0 right-0 top-0 z-10 ml-auto mr-auto cursor-pointer pt-3 dark:invert"
          : "left-0 top-0 z-10 my-5 ml-8 cursor-pointer dark:invert"
      }
      src={"/Logo.svg"}
      alt="KnowX Logo"
      width={50}
      height={50}
      priority
      onClick={() => navigateToDashboard()}
    />
  )
}
