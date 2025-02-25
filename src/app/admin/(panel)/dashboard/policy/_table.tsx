'use client'

import { Policy } from "./types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import DataTable from "@/components/core/data-table";
import { useDataTable } from "@/components/core/data-table/hook";
import { queryPolicyList } from "@/api/policy";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Filter from "./filter";
import { useRouter } from "next/navigation";
export const PolicyTable = () => {
    const router = useRouter();
    const columns = useMemo<ColumnDef<Policy>[]>(() => [
        {
            id: "policy-name",
            header: "policyName",
            size: 300,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        {row.original.name}
                    </div>
                )
            }
        },
        {
            id: "status",
            header: "status",
            size: 300,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        {row.original.status}
                    </div>
                )
            }
        },
        {
            id: "startAt",
            header: "startAt",
            size: 300,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        {row.original.startAt}
                    </div>
                )
            }
        },
        {
            id: "endAt",
            header: "endAt",
            size: 300,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        {row.original.endAt}
                    </div>
                )
            }
        },
        {
            id: "description",
            header: "description",
            size: 300,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        {row.original.description}
                    </div>
                )
            }
        },
        {
            id: "action",
            header: "action",
            size: 300,
            cell: () => {
                return (
                    <div>
                        <Button
                            variant="ghost"
                            onClick={() => {
                                // router.push(`/admin/dashboard/setting/${row.original.id}`);
                                router.push("/admin/dashboard/setting");
                            }}
                        >
                            設置
                        </Button>
                    </div>
                )
            }
        }
    ], [])

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 9,
    })

    const getPolicyList = async () => {
        const response = await queryPolicyList();
        return response.data;
    }

    const { isLoading, data } = useQuery({
        queryKey: ["policy-list"],
        queryFn: getPolicyList,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    })

    const { table } = useDataTable({
        columns,
        data: data as Policy[],
        pagination,
        setPagination,
    })

    return (
        <div className="h-full flex flex-col gap-[12px] w-full mx-auto">
            <div className="flex items-center justify-between">
                <Filter />
                <Button
                    type="button"
                    className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80 w-[200px]"
                >
                    Add Policy
                </Button>
            </div>
            <DataTable
                table={table}
                isLoading={isLoading}
                pagination={pagination}
                setPagination={setPagination}
            />
        </div>
    )
}

export default PolicyTable;