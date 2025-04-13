import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Store } from "@/app/admin/(panel)/dashboard/store/types"
import { useQuery } from "@tanstack/react-query";
import { useDataTable } from "@/components/core/data-table/hook";
import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { DataTable } from "@/components/core/data-table";
import { Edit } from "lucide-react";
import dayjs from "dayjs";
import { getStoreListOfMerchant } from "@/api/merchant";
import { EditDialog } from "./_edit-dialog";

export const StoreTable = () => {
    const merchantId = localStorage.getItem('merchantId') || "";
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
                        {dayjs(row.original.createAt).format("YYYY-MM-DD")}
                    </div>
                )
            }
        },
        {
            id: "action",
            header: "操作",
            cell: ({ row }) => {
                const [open, setOpen] = useState(false)
                return (
                    <>
                        <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                            <div
                                className="cursor-pointer"
                                onClick={() => setOpen(true)}
                            >
                                <Edit
                                    className="size-[15px]"
                                />
                            </div>
                        </div>
                        {
                            open && (
                                <EditDialog
                                    open={open}
                                    onOpenChange={() => {
                                        setOpen(false)
                                        refetch()
                                    }}
                                    store={row.original}
                                />
                            )
                        }
                    </>
                )
            }
        }
    ], [])

    const queryStoreList = async () => {
        const response = await getStoreListOfMerchant(merchantId);
        return response.data;
    }

    const { data, isLoading, refetch } = useQuery({
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