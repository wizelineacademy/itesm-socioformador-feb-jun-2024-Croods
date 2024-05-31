import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react"
import { ReactElement } from "react"
import {
  InformationCircleIcon,
  BookmarkIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline"

/*
  icon:
    0: No icon
    1: Information icon
    2: History icon
    3: Sparkles icon
*/

export default function InformationalModal({
  isOpen,
  onOpenChange,
  title,
  icon,
  body,
}: {
  isOpen: boolean
  onOpenChange: () => void
  title: string
  icon: number
  body: ReactElement
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="dark:dark">
      <ModalContent>
        <>
          <ModalHeader className="flex flex-row items-center gap-2 dark:dark">
            {icon === 1 ? (
              <InformationCircleIcon className="h-6 w-6 text-blue-500" />
            ) : icon === 2 ? (
              <BookmarkIcon className="h-6 w-6 text-yellow-500" />
            ) : icon === 3 ? (
              <SparklesIcon className="h-6 w-6 text-purple-600" />
            ) : (
              ""
            )}

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
