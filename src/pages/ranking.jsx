import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Button } from "@heroui/react"
import ReturnBtn from "@/components/buttons/ReturnBtn"
import columns from "@/data/ranking_columns.json"
import rows from "@/data/ranking_rows.json"


export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-16">
            <h1 className="text-6xl font-bold font-mono">🎖️Hitórico🎖️</h1>
            <ReturnBtn />
            <div className="flex w-full px-32 gap-4">
                <Table fullWidth={true} className="font-mono w-full" aria-label="Ranking Table">
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column?.key}>{column?.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={rows}>
                        {(item) => (
                            <TableRow key={item?.id}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
