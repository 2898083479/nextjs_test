import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Store } from "@/app/admin/(panel)/dashboard/store/types"
import { getStoreInfoList } from "@/api/store";
import { useQuery } from "@tanstack/react-query";
import { useDataTable } from "@/components/core/data-table/hook";
import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { DataTable } from "@/components/core/data-table";
import { Edit } from "lucide-react";

export const StoreTable = () => {
    const columns = useMemo<ColumnDef<Store>[]>(() => [
        {
            id: "name",
            header: "店鋪",
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
            header: "創建時間",
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
            header: "操作",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        <div
                            className="cursor-pointer"
                        >
                            <Edit
                                className="size-[15px]"
                            />
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
        data: data as unknown as Store[],
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