'use client'
import * as React from "react";
import { DataTable } from "@/components/core/data-table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Filter } from "./filter";
import { Store } from "./types";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Edit2Icon, ClipboardList } from "lucide-react";
import { useDataTable } from "@/components/core/data-table/hook";
import { StoreStatusChip } from "./_status";
import { StoreStatus } from "./types";
import { useReviewStore } from "./store";
import { ReviewStep } from "./store";
import { useDisclosure } from "@/components/hooks";
import { useEditStore } from "./store";
import { IndexDialog } from "./dialog/review";
import EditIndexDialog from "./dialog/edit";
import { getStoreInfoList } from "@/api/store";
import { EditStep } from "./store";
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
                    <div
                        className="flex items-center px-[20px] py-[16px] text-[14px] leading-[20px] text-ts"
                    >
                        {row.original.merchantCount}
                    </div>
                )
            }
        },
        {
            id: "goodCount",
            header: "goodCount",
            size: 200,
            cell: ({ row }) => {
                return (
                    <div
                        className="flex items-center px-[20px] py-[16px] text-[14px] leading-[20px] text-ts"
                    >
                        {row.original.goodCount}
                    </div>
                )
            }
        },
        {
            id: "createdAt",
            header: "createdAt",
            size: 200,
            cell: ({ row }) => {
                return (
                    <div
                        className="flex items-center px-[20px] py-[16px] text-[14px] leading-[20px] text-ts"
                    >
                        {format(row.original.createdAt, "yyyy/MM/dd")}
                    </div>
                )
            }
        },
        {
            id: "action",
            enablePinning: true,
            size: 100,
            cell: ({ row }) => {
                const { isOpen, onOpen, onOpenChange } = useDisclosure();
                const { setStep } = useReviewStore();
                const { setStep: setEditStep } = useEditStore();
                if (row.original.status === StoreStatus.Pending) {
                    return (
                        <div
                            className="text-[#0C7FDA] flex items-center justify-center px-[20px] py-[16px] 
                            text-[14px] leading-[20px] text-primary cursor-pointer"
                        >
                            <div
                                onClick={onOpen}
                                className="text-[#0C7FDA] text-[14px] cursor-pointer"
                            >
                                review
                            </div>
                            {
                                isOpen && (
                                    <IndexDialog
                                        open={isOpen}
                                        onOpenChange={(e) => {
                                            if (!e) {
                                                setStep(ReviewStep.Default);
                                            }
                                            onOpenChange(e);
                                        }}
                                        data={row.original}
                                    />
                                )
                            }
                        </div>
                    )
                }
                return (
                    <div
                        className="
                            flex items-center justify-center px-[20px] py-[16px] gap-[12px]
                            text-[14px] leading-[20px] text-primary cursor-pointer
                    ">
                        <Button
                            size={"icon"}
                            variant="link"
                            onClick={onOpen}
                        >
                            <Edit2Icon />
                        </Button>
                        {
                            isOpen && (
                                <EditIndexDialog
                                    open={isOpen}
                                    onOpenChange={(e) => {
                                        if (!e) {
                                            setEditStep(EditStep.Edit);
                                        }
                                        onOpenChange(e);
                                    }}
                                    data={row.original}
                                />
                            )
                        }
                        <Button
                            size={"icon"}
                            variant="link"
                        >
                            <ClipboardList />
                        </Button>
                    </div>
                )
            }
        }
    ], []);

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 8,
    });

    const { isLoading, data } = useQuery({
        queryKey: ['store-data'],
        queryFn: () => getStoreList(),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });

    const getStoreList = async () => {
        const response = await getStoreInfoList({
            id: "",
            filter: {
                search: "",
                merchantCount: 0,
                goodCount: 0,
            }
        })
        return response.data;
    }

    const { table } = useDataTable({
        columns,
        data: data as Store[],
        pagination,
        setPagination,
    });

    return (
        <div className="h-full flex flex-col gap-[12px] w-full mx-auto">
            <Filter />
            <DataTable
                isLoading={isLoading}
                table={table}
                pagination={pagination}
                setPagination={setPagination}
            />
        </div>
    )
}
