'use client'
import * as React from "react";
import { DataTable } from "@/components/core/data-table";
import { Button } from "@/components/ui/button";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useDisclosure } from "@/components/hooks";
import { ReviewStep, useEditStore, useStore } from "./store";
import { Filter } from "./filter";
import { Admin } from "./types";
import { format } from "date-fns";
import { AdminStatus } from "./types";
import { Edit2Icon } from "lucide-react";
import { getFakeData } from "./_data";
import { useDataTable } from "@/components/core/data-table/hook";
import { IndexDialog } from "./dialog/review/index-dialog";
import { IndexDialog2 } from "./dialog/edit/index";
import { EditStep } from "./store";
import { AdminStatusChip } from "./_status";
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
                            <span className="text-ts">{row.original.email}</span>
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
                    <AdminStatusChip status={row.original.status} />
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
                const { setStep: setEditStep } = useEditStore();
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
                    <div className="flex items-center justify-center gap-2">
                        <Button
                            size={"icon"}
                            onClick={onOpen}
                            variant='link'
                        >
                            <Edit2Icon />
                        </Button>
                        {
                            isOpen && (
                                <IndexDialog2 
                                    open={isOpen}
                                    onOpenChange={(e) => {
                                        if (!e) {
                                            setEditStep(EditStep.Edit)
                                        }
                                        onOpenChange(e);
                                    }}
                                    data={row.original}
                                />
                            )
                        }
                        <Button
                            size={"icon"}
                            variant='link'
                        >
                            Details
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