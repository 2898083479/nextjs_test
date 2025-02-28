import { useMemo, useState } from "react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { Order } from "./types";
import { getOrderList } from "@/api/order";
import { useQuery } from "@tanstack/react-query";
import { useDataTable } from "@/components/core/data-table/hook";
import { DataTable } from "@/components/core/data-table";
import dayjs from "dayjs";
const OrderTable = () => {

    const columns: ColumnDef<Order>[] = useMemo(() => [
        {
            id: 'id',
            header: 'orderID',
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
            header: 'goodName',
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
            header: 'totalPrice',
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
            id: 'orderCreateTime',
            header: 'orderCreateTime',
            size: 300,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        {dayjs(row.original.orderCreateTime).format('YYYY-MM-DD HH:mm:ss')}
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

    const { data, isLoading } = useQuery({
        queryKey: ['orderList'],
        queryFn: queryOrderList,
    })

    const { table } = useDataTable({
        data: data as Order[],
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