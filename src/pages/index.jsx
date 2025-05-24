import { Button } from "@heroui/button"
import Link from "next/link"

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-6">
            <h1 className="text-6xl font-bold font-mono">Tabuanimada!</h1>
            <div className="flex gap-4">
                <Button as={Link} href="/config" size="lg" color="primary">Play</Button>
                <Button as={Link} href="/ranking" size="lg" color="default">Histórico</Button>
            </div>
        </div>
    )
}
