import ReturnBtn from "@/components/buttons/ReturnBtn"
import RankingTable from "@/components/table/RankingTable"


export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-8">
            <h2 className="text-6xl font-bold font-mono">🎖️Hitórico🎖️</h2>
            <ReturnBtn />
            <RankingTable />
        </div>
    )
}
