'use client'

import { Filter } from "./filter";
import { Good, GoodCategory } from "./types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { queryGoodListAPI } from "@/api/good";
import { keepPreviousData } from "@tanstack/react-query";
import { useDataTable } from "@/components/core/data-table/hook";
import { DataTable } from "@/components/core/data-table";
import { Button } from "@/components/ui/button";
import { Edit2Icon, ClipboardList, TrashIcon } from "lucide-react";
import { GoodStatusChip } from "./_status";
import CheckDialog from "./dialog/check";
import { EditDialog } from "./dialog/edit/edit-dialog";
import { PreDeleteDialog } from "./dialog/delete/preDelete-dialog";
import { useRouter } from "next/navigation";
import { useGoodStore } from "./store";
import dayjs from "dayjs";

export const GoodDataTable = () => {
    const router = useRouter();
    const { setGoodId } = useGoodStore();
    const policySetting = (goodId: string) => {
        setGoodId(goodId);
        router.push(`/admin/dashboard/setting`);
    }

    const columns = useMemo<ColumnDef<Good>[]>(() => [
        {
            id: "name",
            header: "name",
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
            id: "category",
            header: "category",
            size: 200,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        <div className="flex flex-col text-[14px] leading-[20px]">
                            <GoodStatusChip category={row.original.category as GoodCategory} />
                        </div>
                    </div>
                )
            }
        },
        {
            id: "source",
            header: "source",
            size: 200,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        <div className="flex flex-col text-[14px] leading-[20px]">
                            <span className="text-tp">{row.original.source}</span>
                        </div>
                    </div>
                )
            }
        },
        {
            id: "price",
            header: "price",
            size: 200,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        <div className="flex flex-col text-[14px] leading-[20px]">
                            <span className="text-tp">¥ {row.original.price}</span>
                        </div>
                    </div>
                )
            }
        },
        {
            id: "count",
            header: "count",
            size: 200,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        <div className="flex flex-col text-[14px] leading-[20px]">
                            <span className="text-tp">{row.original.count}</span>
                        </div>
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
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        <div className="flex flex-col text-[14px] leading-[20px]">
                            <span className="text-tp">{dayjs(row.original.createAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                        </div>
                    </div>
                )
            }
        },
        {
            id: "action",
            size: 200,
            cell: ({ row }) => {
                const [isEditDialogOpen, setEditDialogOpen] = useState(false);
                const [isCheckDialogOpen, setCheckDialogOpen] = useState(false);
                const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
                return (
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size={"icon"}
                            onClick={() => setEditDialogOpen(true)}
                        >
                            <Edit2Icon />
                        </Button>
                        {
                            isEditDialogOpen && (
                                <EditDialog
                                    open={isEditDialogOpen}
                                    onOpenChange={setEditDialogOpen}
                                    good={row.original}
                                />
                            )
                        }
                        <Button
                            variant="ghost"
                            size={"icon"}
                            onClick={() => setCheckDialogOpen(true)}
                        >
                            <ClipboardList />
                        </Button>
                        {
                            isCheckDialogOpen && (
                                <CheckDialog
                                    open={isCheckDialogOpen}
                                    onOpenChange={setCheckDialogOpen}
                                    data={row.original}
                                />
                            )
                        }
                        <Button
                            variant="ghost"
                            size={"icon"}
                            onClick={() => setDeleteDialogOpen(true)}
                        >
                            <TrashIcon />
                        </Button>
                        {
                            isDeleteDialogOpen && (
                                <PreDeleteDialog
                                    open={isDeleteDialogOpen}
                                    onOpenChange={setDeleteDialogOpen}
                                    id={row.original.id}
                                />
                            )
                        }
                        <Button
                            variant="ghost"
                            onClick={() => policySetting(row.original.id)}
                        >
                            政策設置
                        </Button>
                    </div>
                )
            }
        }
    ], [])

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 9,
    });

    const getGoodList = async () => {
        const response = await queryGoodListAPI()
        return response.data;
    }

    const { isLoading, data, refetch } = useQuery({
        queryKey: ["good-list"],
        queryFn: getGoodList,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    })

    const { table } = useDataTable({
        columns,
        data: data as unknown as Good[],
        pagination,
        setPagination,
    })

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