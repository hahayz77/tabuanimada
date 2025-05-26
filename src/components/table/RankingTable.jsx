const { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } = require("@heroui/react")
import columns from "@/data/ranking_columns.json"
import rows from "@/data/ranking_rows.json"

const RankingTable = () => {
    return (
        <div className="flex w-full px-32">
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
    )
}

export default RankingTable