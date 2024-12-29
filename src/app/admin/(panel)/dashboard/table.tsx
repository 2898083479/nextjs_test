import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Status } from "./types"

const getData = async () => {
    return [
        {
            name: "ethan",
            goodAmount: 100,
            status: 0,
            createdAt: "2024-01-01",
        },
        {
            name: "ethan",
            goodAmount: 100,
            status: 1,
            createdAt: "2024-01-01",
        },
    ]
}

export const DataTable = () => {
    const { data, isFetching } = useQuery({
        queryKey: ["users"],
        queryFn: () => getData()
    })

    const columns = data?.map((item) => ({
        name: item.name,
        goodAmount: item.goodAmount,
        status: item.status,
        createdAt: item.createdAt,
    })) || []

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Good Amount</TableHead>
                        <TableHead className="text-right">Created At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {columns.map((column) => (
                        <TableRow key={column.name}>
                            <TableCell className="font-medium w-[200px]">{column.name}</TableCell>
                            <TableCell>{Status[column.status]}</TableCell>
                            <TableCell>{column.goodAmount}</TableCell>
                            <TableCell className="text-right">{column.createdAt}</TableCell>
                            <TableCell className="w-[200px]">
                                <div className="flex gap-2 justify-end">
                                    <Button>Edit</Button>
                                    <Button>Detail</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}