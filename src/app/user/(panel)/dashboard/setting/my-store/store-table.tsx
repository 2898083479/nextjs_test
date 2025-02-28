import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Store } from "@/app/admin/(panel)/dashboard/store/types"
import { getStoreInfoList } from "@/api/store";
import { useQuery } from "@tanstack/react-query";
import { useDataTable } from "@/components/core/data-table/hook";
import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { DataTable } from "@/components/core/data-table";
export const StoreTable = () => {
    const columns = useMemo<ColumnDef<Store>[]>(() => [
        {
            id: "name",
            header: "Name",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        {row.original.name}
                    </div>
                )
            }
        },
        {
            id: "createdAt",
            header: "Created At",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        {row.original.createdAt}
                    </div>
                )
            }
        },
        {
            id: "action",
            header: "Action",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        <div
                            className="cursor-pointer"
                        >
                            Edit
                        </div>
                    </div>
                )
            }
        }
    ], [])

    const queryStoreList = async () => {
        const response = await getStoreInfoList(
            {
                id: '1',
            }
        );
        return response.data;
    }

    const { data, isLoading } = useQuery({
        queryKey: ['storeList'],
        queryFn: queryStoreList,
    });

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 9,
    })

    const { table } = useDataTable({
        data: data as Store[],
        columns,
        pagination,
        setPagination,
    })

    return (
        <DataTable
            table={table}
            isLoading={isLoading}
            pagination={pagination}
            setPagination={setPagination}
        />
    )
}

export default StoreTable;