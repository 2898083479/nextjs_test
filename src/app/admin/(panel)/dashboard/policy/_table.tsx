'use client'

import { Policy } from "./types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState, useEffect } from "react";
import { PaginationState } from "@tanstack/react-table";
import DataTable from "@/components/core/data-table";
import { useDataTable } from "@/components/core/data-table/hook";
import { queryPolicyList } from "@/api/policy";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PolicyStatusChip } from "./_status";
import AddPolicyDialog from "./addPolicy-dialog";
import dayjs from "dayjs";
import { SearchIcon, TrashIcon } from "lucide-react";
import { DeleteDialog } from "./_delete-dialog";
import { Input } from "@/components/ui/input";
import { usePolicyFilter } from "./filter.hook";

export const PolicyTable = () => {
    const router = useRouter();
    const [addPolicy, setAddPolicy] = useState(false);
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
                        <PolicyStatusChip status={row.original.status} />
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
                        {dayjs(row.original.startAt).format("YYYY-MM-DD")}
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
                        {dayjs(row.original.endAt).format("YYYY-MM-DD")}
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
            size: 300,
            cell: ({ row }) => {
                const [deleteDialog, setDeleteDialog] = useState(false);
                return (
                    <div className="flex flex-row items-center justify-center gap-2">
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                router.push("/admin/dashboard/setting");
                            }}
                        >
                            設置
                        </div>
                        <div
                            className="w-4 h-4 cursor-pointer"
                            onClick={() => {
                                setDeleteDialog(true);
                            }}
                        >
                            <TrashIcon />
                        </div>
                        {
                            deleteDialog && (
                                <DeleteDialog
                                    open={deleteDialog}
                                    onOpenChange={() => {
                                        setDeleteDialog
                                        refetch()
                                    }}
                                    policyId={row.original.id}
                                />
                            )
                        }
                    </div>
                )
            }
        }
    ], [])

    const { search, setSearch, reset } = usePolicyFilter();

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 9,
    })

    const getPolicyList = async () => {
        const response = await queryPolicyList();
        return response.data;
    }

    const { isLoading, data, refetch } = useQuery({
        queryKey: ["policy-list", search],
        queryFn: getPolicyList,
        select: (data) =>
            search
                ? data.filter((item) => item.name.includes(search))
                : data,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    })

    const { table } = useDataTable({
        columns,
        data: data as unknown as Policy[],
        pagination,
        setPagination,
    })

    useEffect(() => {
        refetch()
    }, [addPolicy])

    return (
        <div className="h-full flex flex-col gap-[12px] w-full mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex flex-row gap-2">
                        <Input
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            placeholder="搜索"
                            className="max-w-[200px]"
                            endContent={
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <SearchIcon className="size-[15px]" />
                                </div>
                            }
                        />
                        <div
                            className="flex items-center text-[#94A3B8] cursor-pointer mr-2"
                            onClick={reset}
                        >
                            重置
                        </div>
                    </div>
                </div>
                <div>
                    <Button
                        type="button"
                        className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80 w-[200px]"
                        onClick={() => setAddPolicy(true)}
                    >
                        新增政策
                    </Button>
                    {
                        addPolicy && (
                            <AddPolicyDialog
                                isOpen={addPolicy}
                                onOpenChange={setAddPolicy}
                            />
                        )
                    }
                </div>
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