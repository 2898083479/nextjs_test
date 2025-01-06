import { useEffect, useState } from 'react'
import {
    ColumnDef,
    ColumnFiltersState,
    PaginationState,
    SortingState,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    Table,
    getPaginationRowModel,
} from '@tanstack/react-table'

interface UseDataTableProps<TData, TValue> {
    useTableSize?: boolean
    columns: ColumnDef<TData, TValue>[]
    data?: TData[]
    pagination: PaginationState
    setPagination: (state: PaginationState) => void
    onDataChange?: (data: TData[]) => void
}

interface UseDataTableReturn<TData> {
    table: Table<TData>
}

export function useDataTable<TData, TValue>({
    columns,
    data,
    pagination,
    setPagination,
    onDataChange,
}: UseDataTableProps<TData, TValue>): UseDataTableReturn<TData> {
    const [sorting, setSorting] = useState<SortingState>([])
    const [rowSelection, setRowSelection] = useState({})
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable({
        data: data ?? [],
        columns,
        state: {
            sorting,
            columnFilters,
            rowSelection,
            pagination,
        },
        enableRowSelection: true,
        manualPagination: true,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onRowSelectionChange: setRowSelection,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        rowCount: pagination.pageSize,
        meta: {
            updateData: (rowIndex: number, columnId: string, value: any) => {
                if (!data || !onDataChange) return;

                const newData = [...data];
                newData[rowIndex] = {
                    ...newData[rowIndex],
                    [columnId]: value
                };
                onDataChange(newData);
            },
            updateMultipleData: (rowIndex: number, columns: { [key: string]: any }) => {
                if (!data || !onDataChange) return;

                const newData = [...data];
                newData[rowIndex] = {
                    ...newData[rowIndex],
                    ...columns
                };
                onDataChange(newData);
            }
        }
    });

    useEffect(() => {
        if (table.getRowModel().rows.length % pagination.pageSize === 0 && pagination.pageIndex > 0) {
            setPagination({
                ...pagination,
                pageIndex: pagination.pageIndex - 1
            });
        }
    }, [data]);

    return {
        table
    }
}