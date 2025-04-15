import { useMemo, useState } from "react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { Order } from "./types";
import { getOrderList } from "@/api/order";
import { useQuery } from "@tanstack/react-query";
import { useDataTable } from "@/components/core/data-table/hook";
import { DataTable } from "@/components/core/data-table";
import dayjs from "dayjs";
import { FeedbackDialog } from "./_feedback-dialog";
const OrderTable = () => {
    const merchantId = localStorage.getItem("merchantId") || "";
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
            size: 100,
            cell: ({ row }) => {
                const [open, setOpen] = useState(false)
                return (
                    <div>
                        <div
                            onClick={() => {
                                setOpen(true)
                            }}
                            className="flex items-center px-[20px] py-[16px] gap-[12px] cursor-pointer">
                            我要反馈
                        </div>
                        {
                            open && (
                                <FeedbackDialog
                                    open={open}
                                    onOpenChange={setOpen}
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
        const response = await getOrderList(merchantId);
        return response.data;
    }

    const { data, isLoading } = useQuery({
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