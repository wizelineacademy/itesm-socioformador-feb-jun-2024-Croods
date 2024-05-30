import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react"

import { ReactElement } from "react"

export default function InformationalModal({
  isOpen,
  onOpenChange,
  title,
  body,
}: {
  isOpen: boolean
  onOpenChange: () => void
  title: string
  body: ReactElement
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="dark:dark">
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1 dark:dark">
            {title}
          </ModalHeader>
          <ModalBody>
            <p>{body}</p>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  )
}
