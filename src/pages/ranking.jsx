import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Button } from "@heroui/react"
import { RiArrowLeftSLine } from "react-icons/ri";
import { columns } from "@/data/ranking_columns.json"

const rows = [
    {
        key: "1",
        name: "Tony Reichert",
        response_time: "30 s",
        questions: "30",
        correct_answers: 20,
        percentage: "60%",
    },
    {
        key: "1",
        name: "Tony Reichert",
        response_time: "30 s",
        questions: "30",
        correct_answers: 20,
        percentage: "60%",
    },
    {
        key: "1",
        name: "Tony Reichert",
        response_time: "30 s",
        questions: "30",
        correct_answers: 20,
        percentage: "60%",
    }
]



export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-16">
            <h1 className="text-6xl font-bold font-mono">🎖️Hitórico🎖️</h1>
            <Button
                as={Link}
                href="/"
                size="lg"
                color="danger"
                variant="ghost"
                className="absolute top-4 left-4 pr-6 pl-2"
                startContent={<RiArrowLeftSLine className="text-xl" />}
            >
                Voltar
            </Button>
            <div className="flex w-full px-32 gap-4">
                <Table fullWidth={true} className="font-mono w-full" aria-label="Ranking Table">
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column?.key}>{column?.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={rows}>
                        {(item) => (
                            <TableRow key={item?.key}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
