'use client'
import * as React from "react";
import { DataTable } from "@/components/core/data-table";
import { Button } from "@/components/ui/button";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useDisclosure } from "@/components/hooks";
import { ReviewStep, useEditStore, useStore } from "./store";
import { Merchant } from "./types";
import { format } from "date-fns";
import { MerchantStatus } from "./types";
import { Edit2Icon, TrashIcon, ClipboardList, SearchIcon } from "lucide-react";
import { useDataTable } from "@/components/core/data-table/hook";
import { IndexDialog } from "./dialog/review/index-dialog";
import { IndexDialog2 } from "./dialog/edit/index";
import { EditStep } from "./store";
import { MerchantStatusChip } from "./_status";
import { getMerchantInfo } from "@/api/merchant";
import { CheckDialog } from "./dialog/check/check-dialog";
import { MerchantDeleteDialog } from "./dialog/delete-dialog";
import { useTableFilter } from "./filter.hook";
import { Filter } from "./filter";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

export const MerchantDataTable = () => {
    const { searchValue, setSearchValue, reset } = useTableFilter();
    const columns = useMemo<ColumnDef<Merchant>[]>(() => [
        {
            id: "admin-info",
            header: 'Merchant信息',
            size: 300,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        <div className="flex flex-row text-[14px] leading-[20px] gap-2">
                            <Avatar>
                                <AvatarImage src={row.original.avatar} alt="@shadcn" />
                                <AvatarFallback>
                                    <Skeleton />
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-tp">{row.original.name}</span>
                                <span className="text-ts">{row.original.email}</span>
                            </div>
                        </div>
                    </div>
                )
            }
        },
        {
            id: "status",
            header: '狀態',
            size: 200,
            cell: ({ row }) => {
                return (
                    <MerchantStatusChip status={row.original.status} />
                )
            }
        },
        {
            id: "createdAt",
            header: '創建時間',
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
                const [idDelete, setIdDelete] = useState(false)
                const [idCheck, setIdCheck] = useState(false)
                if (row.original.status === MerchantStatus.Pending) {
                    return (
                        <div
                            className="flex items-center justify-center px-[20px] py-[16px] text-[14px] leading-[20px] text-primary cursor-pointer"
                        >
                            <div
                                onClick={onOpen}
                                className="text-[#0C7FDA] text-[14px] cursor-pointer"
                            >
                                審核
                            </div>
                            {
                                isOpen && (
                                    <IndexDialog
                                        open={isOpen}
                                        onOpenChange={(e) => {
                                            if (!e) {
                                                setStep(ReviewStep.Default);
                                                refetch();
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
                    <div className="flex items-center justify-center gap-1">
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
                                            refetch();
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
                            onClick={() => setIdCheck(true)}
                        >
                            <ClipboardList />
                        </Button>
                        {
                            idCheck && (
                                <CheckDialog
                                    open={idCheck}
                                    onOpenChange={setIdCheck}
                                    data={row.original}
                                />
                            )
                        }
                        <Button
                            size={"icon"}
                            variant='link'
                            onClick={() => setIdDelete(true)}
                        >
                            <TrashIcon />
                        </Button>
                        {
                            idDelete && (
                                <MerchantDeleteDialog
                                    open={idDelete}
                                    onOpenChange={(e) => {
                                        if (!e) {
                                            refetch()
                                        }
                                        setIdDelete(e)
                                    }}
                                    id={row.original.merchantId}
                                />
                            )
                        }
                    </div>
                )
            }
        }
    ], []);

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 9,
    });
    const { filter } = useTableFilter();
    const accessToken = localStorage.getItem("accessToken")
    const { isLoading, data, refetch } = useQuery({
        queryKey: ['merchant-list', searchValue],
        queryFn: () => getMerchantInfoList(),
        select: (data) =>
            searchValue
                ? data.filter((item) => item.name.includes(searchValue))
                : data,
        refetchOnWindowFocus: false,
        enabled: !!accessToken,
    });

    const getMerchantInfoList = async () => {
        const response = await getMerchantInfo(searchValue);
        return response.data;
    }

    const { table } = useDataTable({
        columns,
        data: data as unknown as Merchant[],
        pagination,
        setPagination,
    });

    return (
        <div className="h-full flex flex-col gap-[12px] w-full mx-auto overscroll-none">
            <div className="flex items-center justify-between">
                <div className="flex flex-row gap-2">
                    <Input
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                            refetch();
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
            <DataTable
                isLoading={isLoading}
                table={table}
                pagination={pagination}
                setPagination={setPagination}
            />
        </div>
    )
}