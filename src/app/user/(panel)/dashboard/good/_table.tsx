import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Good } from "@/app/admin/(panel)/dashboard/good/types";
import { PaginationState } from "@tanstack/react-table";
import { queryGoodList } from "@/api/good";
import { useQuery } from "@tanstack/react-query";
import { useDataTable } from "@/components/core/data-table/hook";
import { DataTable } from "@/components/core/data-table";
import GoodFilter from "./_filter";
import { ArrowDownUp } from "lucide-react";
import AddGoodDialog from "@/app/user/(panel)/dashboard/good/dialog/addGood"
import BuyGoodDialog from "@/app/user/(panel)/dashboard/good/dialog/buyGood"

const GoodTable = () => {
    const [sort, setSort] = useState(false);
    const columns = useMemo<ColumnDef<Good>[]>(() => [
        {
            id: "name",
            header: "Name",
            size: 300,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        {row.original.name}
                    </div>
                )
            }
        },
        {
            id: "price",
            header: () => (
                <span className="flex flex-row items-center gap-[12px]">
                    Price
                    <ArrowDownUp
                        className="cursor-pointer"
                        size={12}
                        onClick={() => setSort(!sort)}
                    />
                </span>
            ),
            size: 300,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        <span className="text-tp">¥ {row.original.price}</span>
                    </div>
                )
            }
        },
        {
            id: "source",
            header: "Source",
            size: 300,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        {row.original.source}
                    </div>
                )
            }
        },
        {
            id: "action",
            header: "Action",
            size: 300,
            cell: () => {
                const [addGood, setAddGood] = useState(false);
                const [buyGood, setBuyGood] = useState(false);
                return (
                    <div className="flex flex-row items-center px-[20px] py-[16px] gap-[12px]">
                        <div className="flex flex-row items-center gap-[12px]">
                            <div
                                className="cursor-pointer"
                                onClick={() => {
                                    setAddGood(true);
                                }}
                            >
                                添加
                            </div>
                            {
                                addGood && (
                                    <AddGoodDialog
                                        open={addGood}
                                        onOpenChange={setAddGood}
                                    />
                                )
                            }
                            <div
                                className="cursor-pointer"
                                onClick={() => {
                                    setBuyGood(true);
                                }}
                            >
                                購買
                            </div>
                            {
                                buyGood && (
                                    <BuyGoodDialog
                                        open={buyGood}
                                        onOpenChange={setBuyGood}
                                    />
                                )
                            }
                        </div>
                    </div>
                )
            }
        }
    ], [])

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 9
    })

    const getGoodList = async () => {
        const response = await queryGoodList({
            id: '1',
            filter: {
                search: ''
            }
        })
        return response;
    }

    const { data, isLoading } = useQuery({
        queryKey: ['goodList'],
        queryFn: getGoodList,
    })

    const { table } = useDataTable({
        data: data?.data as Good[],
        columns,
        pagination,
        setPagination
    })

    return (
        <div className="flex flex-col gap-[12px] w-full mx-auto">
            <GoodFilter />
            <DataTable
                table={table}
                isLoading={isLoading}
                pagination={pagination}
                setPagination={setPagination}
            />
        </div>
    )
}

export default GoodTable;