'use client'

import { Column, PaginationState, Table, flexRender } from "@tanstack/react-table"
import {
    Table as UITable,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CSSProperties } from "react"
import { Pagination } from "@/components/core/pagination"
import { Loader2 } from "lucide-react"

interface DataTableProps<TData> {
    useTableSize?: boolean
    isLoading: boolean
    table: Table<TData>
    pagination: PaginationState
    setPagination: (state: PaginationState) => void
}

export function DataTable<TData>({
    useTableSize = true,
    isLoading,
    table,
    pagination,
    setPagination,
}: DataTableProps<TData>) {
    const getColumnClasses = (column: Column<any>): CSSProperties => {
        const size = column.getSize();
        const width = (column.columnDef as any).width;
        const isPinned = column.columnDef.enablePinning;
        return {
            right: `${column.getAfter("right")}px`,
            position: isPinned ? "sticky" : "relative",
            width: useTableSize ? size : width,
            zIndex: isPinned ? 1 : 0,
            backgroundColor: isPinned ? "white" : undefined,
            boxShadow: isPinned ? "inset 1px 0 0 #E4E7EC" : undefined,
        }
    }

    const maxPage = table.getRowModel().rows.length > 0 ? Math.ceil(table.getRowModel().rows.length / pagination.pageSize) : 0;
    const lastPageRows = table.getRowModel().rows.length % pagination.pageSize;
    const emptyRows = lastPageRows === 0 ? 0 : pagination.pageSize - lastPageRows;

    return (
        <div className="w-full h-full flex flex-col rounded-[6px] border border-[#E4E7EC] shadow-sm bg-white overflow-hidden relative">
            <UITable
                className="h-full border-b border-[#E4E7EC]"
                style={{
                    width: "100%",
                    minWidth: useTableSize ? table.getTotalSize() - 2 : undefined,
                }}
            >
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const { column } = header;
                                return (
                                    <TableHead
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        className="px-[24px] text-[12px] leading-[150%] text-[#475467]"
                                        style={{ ...getColumnClasses(column), backgroundColor: "#F9FAFB" }}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody className="relative">
                    {
                        !isLoading && (
                            table.getRowModel().rows.slice(pagination.pageIndex * pagination.pageSize, (pagination.pageIndex + 1) * pagination.pageSize).map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="p-0 h-[72px]"
                                            style={{ ...getColumnClasses(cell.column) }}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )
                    }
                    {pagination.pageIndex + 1 === maxPage && emptyRows > 0 && Array.from({ length: emptyRows }).map((_, index) => (
                        <TableRow key={`empty-row-${index}`}>
                            <TableCell colSpan={table.getAllColumns().length} className="h-[72px]" />
                        </TableRow>
                    ))}
                </TableBody>
            </UITable>
            <div className="w-full px-[24px] py-[12px]">
                <Pagination
                    currentPage={pagination.pageIndex}
                    totalPages={maxPage}
                    onPageChange={(page) => {
                        setPagination({ ...pagination, pageIndex: page });
                    }}
                />
            </div>

            {
                isLoading && (
                    <div className="flex items-center justify-center h-full text-center absolute inset-0">
                        <Loader2 className="animate-spin w-4 h-4" />
                    </div>
                )
            }
            {
                !isLoading && table.getRowModel().rows.length === 0 && (
                    <div className="flex items-center justify-center h-full text-center absolute inset-0">
                        <span>Empty Data</span>
                    </div>
                )
            }
        </div>
    )
}

export default DataTable;