import { Button } from "@heroui/button"
import Link from "next/link"
import { FaGamepad } from "react-icons/fa";
import { FaMedal } from "react-icons/fa6";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-6">
            <h1 className="text-7xl font-mono font-extrabold text-emerald-300">
                <span className="">Tabu</span>
                <span className="text-sky-300">Ani</span>
                <span className="text-amber-200">mada!</span>
            </h1>
            <div className="flex gap-4">
                <Button
                    as={Link}
                    href="/config"
                    size="lg"
                    color="success"
                    className="animate-bounce hover:animate-none hover:scale-110 hover:-translate-y-2 text-white"
                    startContent={<FaGamepad className="text-xl" />}
                >
                    Play
                </Button>
                <Button
                    as={Link}
                    href="/ranking"
                    size="lg"
                    color="warning"
                    className="animate-bounce animation-delay-320 hover:animate-none hover:scale-110 hover:-translate-y-2 text-white"
                    startContent={<FaMedal className="text-lg" />}
                >
                    Histórico
                </Button>
            </div>
        </div>
    )
}
