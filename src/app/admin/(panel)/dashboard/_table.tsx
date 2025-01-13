'use client'
import * as React from "react";
import { DataTable } from "@/components/core/data-table";
import { Button } from "@/components/ui/button";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useDisclosure } from "@/components/hooks";
import { ReviewStep, useStore } from "./store";
import { Filter } from "./filter";
import { Admin } from "./types";
import { format } from "date-fns";
import { AdminStatus } from "./types";
import { Edit2Icon } from "lucide-react";
import { getFakeData } from "./_data";
import { useDataTable } from "@/components/core/data-table/hook";
import { IndexDialog } from "./dialog/index-dialog";
export const AdminDataTable = () => {
    const columns = useMemo<ColumnDef<Admin>[]>(() => [
        {
            id: "admin-info",
            header: 'adminInformation',
            size: 300,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        <div className="flex flex-col text-[14px] leading-[20px]">
                            <span className="text-tp">{row.original.name}</span>
                        </div>
                    </div>
                )
            }
        },
        {
            id: "status",
            header: 'status',
            size: 200,
            cell: ({ row }) => {
                return (
                    <div className="flex items-left justify-start px-[20px] py-[16px]">
                        {row.original.status}
                    </div>
                )
            }
        },
        {
            id: "createdAt",
            header: 'createdAt',
            size: 200,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] text-[14px] leading-[20px] text-ts">
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
                const { setStep } = useStore();
                if (row.original.status === AdminStatus.Inactive) {
                    return (
                        <div
                            className="flex items-center justify-center px-[20px] py-[16px] text-[14px] leading-[20px] text-primary cursor-pointer"
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
                                            onOpenChange(e);
                                            if (!e) {
                                                setStep(ReviewStep.Default);
                                            }
                                        }}
                                        data={row.original}
                                    />
                                )
                            }
                        </div>
                    )
                }
                return (
                    <div className="flex items-center justify-center gap-1">
                        <Button
                            size={"icon"}
                            variant={"ghost"}
                            onClick={onOpen}
                        >
                            <Edit2Icon />
                        </Button>
                        {/* {
                            isOpen && (
                                <EditDialog
                                    open={isOpen}
                                    onOpenChange={(e) => {
                                        onOpenChange(e);
                                        if (!e) {
                                            setEditStep(EditStep.Edit);
                                        }
                                    }}
                                    {...row.original}
                                />
                            )
                        } */}
                        <Button
                            size={"icon"}
                            variant={"ghost"}
                        >
                            111
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

    const { isFetching, data } = useQuery({
        queryKey: ['ngo-account-data'],
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