import Link from "next/link"
import { Button } from "@heroui/react"
import { RiArrowLeftSLine } from "react-icons/ri"

const ReturnBtn = () => {
    return (
        <Button
            as={Link}
            href="/"
            size="md"
            color="danger"
            variant="ghost"
            className="absolute top-4 left-4 pr-6 pl-2"
            startContent={<RiArrowLeftSLine className="text-xl" />}
        >
            Voltar
        </Button>
    )
}

export default ReturnBtn