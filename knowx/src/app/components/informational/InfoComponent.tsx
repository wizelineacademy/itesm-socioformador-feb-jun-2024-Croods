"use client"
import InfoButton from "./InfoButton"
import InformationalModal from "./InformationalModal"
import { ReactElement, useState } from "react"

export default function InfoComponent({
  title,
  children,
}: {
  title: string
  children: ReactElement
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative dark:dark">
      <InfoButton onClick={() => setIsOpen(true)} />
      <InformationalModal
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(false)}
        title={title}
        body={children}
      />
    </div>
  )
}
