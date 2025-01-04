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
import { Status } from "./types"
import { useState } from "react"
import IndexDialog from "./dialog/index-dialog"
import { Admin } from "./types"
import { ReviewStep, useStore } from "./store"
import DataTable from "@/components/core/data-table"
const getData = async () => {
    return [
        {
            name: "ethan",
            goodAmount: 100,
            status: 0,
            createdAt: "2024-01-01",
        },
        {
            name: "King",
            goodAmount: 100,
            status: 1,
            createdAt: "2024-01-01",
        },
        {
            name: "wang",
            goodAmount: 100,
            status: 2,
            createdAt: "2024-01-01",
        },
    ]
}

export const AdminDataTable = () => {
    const [open, onOpenChange] = useState(false)
    const { setStep } = useStore()
    const [selectedData, setSelectedData] = useState<Admin | null>(null)
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
                                {
                                    column.status !== 1 ? (
                                        <>
                                            <div
                                                className="flex gap-2 justify-end"
                                                onClick={() => {
                                                    setSelectedData(column)
                                                    onOpenChange(true)
                                                }}
                                            >
                                                立即审核
                                            </div>
                                        </>

                                    ) : (
                                        <div className="flex gap-2 justify-end">
                                            <Button variant="outline">Edit</Button>
                                            <Button variant="secondary">Detail</Button>
                                        </div>
                                    )
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <IndexDialog
                open={open}
                onOpenChange={(e) => {
                    onOpenChange(e);
                    if (!e) {
                        setStep(ReviewStep.Default)
                    }
                }}
                data={selectedData as Admin}
            />
        </div>
    )
}