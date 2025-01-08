'use client'
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { Status } from "./types"
import { useState } from "react"
import IndexDialog from "./dialog/index-dialog"
import { Admin } from "./types"
import { ReviewStep, useStore } from "./store"
import DataTable from "@/components/core/data-table"
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table"

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
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })

    const { data, isFetching } = useQuery({
        queryKey: ["users"],
        queryFn: () => getData()
    })

    const columns: ColumnDef<Admin>[] = [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "goodAmount",
            header: "Good Amount",
        },
        {
            accessorKey: "status",
            header: "Status",
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
        },
    ]

    const table = useReactTable({
        data: data ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div>
            <DataTable
                table={table}
                pagination={pagination}
                setPagination={setPagination}
                isLoading={isFetching}
            />

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