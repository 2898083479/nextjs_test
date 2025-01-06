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
            <DataTable
                columns={[
                    {
                        header: {
                            title: "名称"
                        },
                        body: {
                            key: "name",
                            value: columns.map(col => col.name)
                        }
                    },
                    {
                        header: {
                            title: "商品数量"
                        },
                        body: {
                            key: "goodAmount", 
                            value: columns.map(col => col.goodAmount)
                        }
                    },
                    {
                        header: {
                            title: "状态"
                        },
                        body: {
                            key: "status",
                            value: columns.map(col => col.status)
                        }
                    },
                    {
                        header: {
                            title: "创建时间"
                        },
                        body: {
                            key: "createdAt",
                            value: columns.map(col => col.createdAt)
                        }
                    }
                ]}
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