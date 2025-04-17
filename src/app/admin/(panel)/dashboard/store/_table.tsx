'use client'
import * as React from "react";
import { DataTable } from "@/components/core/data-table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Filter } from "./filter";
import { Store } from "./types";
import { Button } from "@/components/ui/button";
import { Edit2Icon, TrashIcon, UserPlus } from "lucide-react";
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
import { StoreDeleteDialog } from "./dialog/delete-dialog";
import { EditStep } from "./store";
import { useTableFilter } from "./filter.hook";
import dayjs from "dayjs";
import { useAddStore, AddStep } from "./store";
import AddMerchantDialog from "./dialog/addMerchant";
import { Input } from "@/components/ui/input";
export const StoreDataTable = () => {
    const {
        searchValue,
        setSearchValue,
        reset
    } = useTableFilter();

    const columns = useMemo<ColumnDef<Store>[]>(() => [
        {
            id: "store-info",
            header: "店鋪信息",
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
            header: "狀態",
            size: 200,
            cell: ({ row }) => {
                return (
                    <StoreStatusChip status={row.original.status as StoreStatus} />
                )
            }
        },
        {
            id: "merchantCount",
            header: "店員數量",
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
            header: "商品數量",
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
            header: "創建時間",
            size: 200,
            cell: ({ row }) => {
                return (
                    <div
                        className="flex items-center px-[20px] py-[16px] text-[14px] leading-[20px] text-ts"
                    >
                        {dayjs(row.original.createAt).format("YYYY/MM/DD")}
                    </div>
                )
            }
        },
        {
            id: "description",
            header: "描述",
            size: 200,
            cell: ({ row }) => {
                return (
                    <div
                        className="flex items-center px-[20px] py-[16px] text-[14px] leading-[20px] text-ts"
                    >
                        {row.original.description}
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
                const { isOpen: isAddOpen, onOpen: onAddOpen, onOpenChange: onAddOpenChange } = useDisclosure();
                const { isOpen: isDeleteOpen, onOpen: onOpenDelete, onOpenChange: onOpenDeleteChange } = useDisclosure(false)
                const { setStep: setAddStep } = useAddStore()
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
                                                refetch()
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
                            flex items-center justify-center px-[20px] py-[16px] gap-1
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
                                            refetch()
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
                            onClick={onOpenDelete}
                        >
                            <TrashIcon />
                        </Button>
                        {
                            isDeleteOpen && (
                                <StoreDeleteDialog
                                    open={isDeleteOpen}
                                    onOpenChange={(e) => {
                                        if (!e) {
                                            refetch()
                                        }
                                        onOpenDeleteChange(e)
                                    }}
                                    id={row.original.storeId}
                                />
                            )
                        }
                        <Button
                            size={"icon"}
                            variant="link"
                            onClick={onAddOpen}
                        >
                            <UserPlus />
                        </Button>
                        {
                            isAddOpen && (
                                <AddMerchantDialog
                                    open={isAddOpen}
                                    onOpenChange={(e) => {
                                        if (!e) {
                                            setAddStep(AddStep.PreAdd)
                                            refetch()
                                        }
                                        onAddOpenChange(e)
                                    }}
                                    storeId={row.original.storeId}
                                />
                            )
                        }
                    </div>
                )
            }
        }
    ], []);
    const accessToken = localStorage.getItem("accessToken")
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 9,
    });

    const { isLoading, data, refetch } = useQuery({
        queryKey: ['store-data', searchValue],
        queryFn: () => getStoreList(),
        select: (data) =>
            searchValue
                ? data.filter((item) => item.name.includes(searchValue))
                : data,
        refetchOnWindowFocus: false,
        enabled: !!accessToken,
    });

    const getStoreList = async () => {
        const response = await getStoreInfoList()
        return response.data;
    }

    const { table } = useDataTable({
        columns,
        data: data as unknown as Store[],
        pagination,
        setPagination,
    });

    return (
        <div className="h-full flex flex-col gap-[12px] w-full mx-auto">
            <div className="flex flex-row gap-2">
                <Input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="搜索"
                    className="max-w-[200px] text-[#94A3B8]"
                />
                <div
                    onClick={reset}
                    className="flex items-center justify-center text-[#94A3B8] cursor-pointer"
                >
                    重置
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
