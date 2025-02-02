import * as React from "react";
import { DataTable } from "@/components/core/data-table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Filter } from "./filter";
import { Store } from "./types";
import { format } from "date-fns";
import { Edit2Icon, ClipboardList } from "lucide-react";
import { getFakeData } from "./_data";
import { useDataTable } from "@/components/core/data-table/hook";
import { StoreStatusChip } from "./_status";
import { StoreStatus } from "./types";
export const StoreDataTable = () => {
    const columns = useMemo<ColumnDef<Store>[]>(() => [
        {
            id: "store-info",
            header: "storeInformation",
            size: 300,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        <div className="flex flex-col text-[14px] leading-[20px]">
                            <span className="text-tp">{row.original.name}</span>
                            <span className="text-ts">{row.original.email}</span>
                        </div>
                    </div>
                )
            }
        },
        {
            id: "status",
            header: "status",
            size: 200,
            cell: ({ row }) => {
                return (
                    <StoreStatusChip status={row.original.status} />
                )
            }
        },
        {
            id: "merchantCount",
            header: "merchantCount",
            size: 200,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] text-[14px] leading-[20px] text-ts">{row.original.merchantCount}</div>
                )
            }
        },
        {
            id: "goodCount",
            header: "goodCount",
            size: 200,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] text-[14px] leading-[20px] text-ts">{row.original.goodCount}</div>
                )
            }
        },
        {
            id: "createdAt",
            header: "createdAt",
            size: 200,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] text-[14px] leading-[20px] text-ts">{format(row.original.createdAt, "yyyy/MM/dd")}</div>
                )
            }
        },
        {
            id: "action",
            enablePinning: true,
            size: 100,
            cell: ({ row }) => {
                if (row.original.status === StoreStatus.Pending) {
                    return (
                        <div
                            className="flex items-center justify-center px-[20px] py-[16px] 
                            text-[14px] leading-[20px] text-primary cursor-pointer"
                        >
                            review
                        </div>
                    )
                }
                return (
                    <div
                        className="
                            flex items-center justify-center px-[20px] py-[16px] gap-[12px]
                            text-[14px] leading-[20px] text-primary cursor-pointer
                    ">
                        <span>
                            <Edit2Icon className="w-[18px] h-[18px]" />
                        </span>
                        <span>
                            <ClipboardList className="w-[18px] h-[18px]" />
                        </span>
                    </div>
                )
            }
        }
    ], []);

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const { isFetching, data } = useQuery({
        queryKey: ['store-data'],
        queryFn: () => getFakeData(),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });

    const { table } = useDataTable({
        columns,
        data,
        pagination,
        setPagination,
    });

    return (
        <div className="h-full flex flex-col gap-[12px] w-full mx-auto">
            <Filter />
            <DataTable
                isLoading={isFetching}
                table={table}
                pagination={pagination}
                setPagination={setPagination}
            />
        </div>
    )
}
