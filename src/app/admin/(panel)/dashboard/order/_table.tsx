import { useMemo, useState } from "react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { Order } from "@/app/user/(panel)/dashboard/order/types";
import { getOrderList } from "@/api/order";
import { useQuery } from "@tanstack/react-query";
import { useDataTable } from "@/components/core/data-table/hook";
import { DataTable } from "@/components/core/data-table";
import dayjs from "dayjs";
import { CloseDialog } from "./close-dialog";
import { CancelDialog } from "./cancel-dialog";
const OrderTable = () => {
    const columns: ColumnDef<Order>[] = useMemo(() => [
        {
            id: 'id',
            header: '訂單ID',
            size: 450,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        {row.original.id}
                    </div>
                )
            }
        },
        {
            id: 'goodName',
            header: '商品名稱',
            size: 300,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        {row.original.goodName}
                    </div>
                )
            }
        },
        {
            id: 'totalPrice',
            header: '總價格',
            size: 200,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        ¥ {row.original.totalPrice}
                    </div>
                )
            }
        },
        {
            id: 'destination',
            header: '收貨地址',
            size: 300,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        {row.original.destination}
                    </div>
                )
            }
        },
        {
            id: 'orderCreateTime',
            header: '支付時間',
            size: 300,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        {dayjs(row.original.orderCreateTime).format('YYYY-MM-DD HH:mm:ss')}
                    </div>
                )
            }
        },
        {
            id: 'action',
            size: 200,
            cell: ({ row }) => {
                const [openCancelDialog, setOpenCancelDialog] = useState(false);
                const [openCloseDialog, setOpenCloseDialog] = useState(false);
                return (
                    <div className="flex flex-row items-center px-[20px] py-[16px] gap-[12px]">
                        <span
                            className="cursor-pointer text-[#0ea5e9]"
                            onClick={() => {
                                setOpenCancelDialog(true)
                            }}
                        >
                            取消订单
                        </span>
                        {
                            openCancelDialog && (
                                <CancelDialog
                                    open={openCancelDialog}
                                    onOpenChange={() => {
                                        setOpenCancelDialog
                                        // refetch()
                                    }}
                                    orderId={row.original.id}
                                />
                            )
                        }
                        <span
                            className="cursor-pointer text-[#0ea5e9]"
                            onClick={() => {
                                setOpenCloseDialog(true)
                            }}
                        >
                            终止订单
                        </span>
                        {
                            openCloseDialog && (
                                <CloseDialog
                                    open={openCloseDialog}
                                    onOpenChange={() => {
                                        setOpenCloseDialog
                                        // refetch()
                                    }}
                                    orderId={row.original.id}
                                />
                            )
                        }
                    </div>
                )
            }
        }
    ], [])

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 9,
    })

    const queryOrderList = async () => {
        const response = await getOrderList();
        return response.data;
    }

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['orderList'],
        queryFn: queryOrderList,
    })

    const { table } = useDataTable({
        data: data as unknown as Order[],
        columns,
        pagination,
        setPagination,
    })

    return (
        <div>
            <DataTable
                isLoading={isLoading}
                table={table}
                pagination={pagination}
                setPagination={setPagination}
            />
        </div>
    )
}

export default OrderTable;