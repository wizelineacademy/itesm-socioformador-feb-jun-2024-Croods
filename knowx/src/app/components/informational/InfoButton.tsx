import { Button } from "@nextui-org/react"
import { InformationCircleIcon } from "@heroicons/react/24/outline"

export default function InfoButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      isIconOnly
      color="default"
      onClick={onClick}
      className="absolute bottom-0 right-0 m-3"
    >
      <InformationCircleIcon className="h-7 w-7" />
    </Button>
  )
}
