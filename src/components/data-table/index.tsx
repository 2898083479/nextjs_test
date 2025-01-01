'use client'
import {
    Table as TableUI,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"

interface Props<T> {
    columns: {
        header: {
            title: string
        }
        body: {
            key: string
            value: any
        }
    }[]
}

// 自定义table组件
export const DataTable = <T,>({ columns }: Props<T>) => {
    return (
        <TableUI>
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHead key={column.header.title}>{column.header.title}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {columns.map((column) => (
                    <TableRow key={column.body.key}>
                        <TableCell>{column.body.value}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </TableUI>
    )
}