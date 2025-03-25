import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Good } from "@/app/admin/(panel)/dashboard/good/types";
import { PaginationState } from "@tanstack/react-table";
import { queryGoodListAPI } from "@/api/good";
import { useQuery } from "@tanstack/react-query";
import { useDataTable } from "@/components/core/data-table/hook";
import { DataTable } from "@/components/core/data-table";
import GoodFilter from "./_filter";
import { ArrowDownUp } from "lucide-react";
import AddGoodDialog from "@/app/user/(panel)/dashboard/good/dialog/addGood"
import BuyGoodDialog from "@/app/user/(panel)/dashboard/good/dialog/buyGood"
import { useDisclosure } from "@/components/hooks";
import { AddStep } from "@/app/user/(panel)/dashboard/good/dialog/store";
import { useAddStore } from "@/app/user/(panel)/dashboard/good/dialog/store";
import { useBuyStore, BuyStep } from "@/app/user/(panel)/dashboard/good/dialog/store";

const GoodTable = () => {
    const [sort, setSort] = useState(false);
    const columns = useMemo<ColumnDef<Good>[]>(() => [
        {
            id: "name",
            header: "商品名稱",
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
                    價格
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
            header: "產地",
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
            header: "操作",
            size: 300,
            cell: ({ row }) => {
                const { isOpen: isAddOpen, onOpen: onAddOpen, onOpenChange: onAddOpenChange } = useDisclosure();
                const { isOpen: isBuyOpen, onOpen: onBuyOpen, onOpenChange: onBuyOpenChange } = useDisclosure();
                const { setStep } = useAddStore();
                const { setStep: setBuyStep } = useBuyStore();
                return (
                    <div className="flex flex-row items-center px-[20px] py-[16px] gap-[12px]">
                        <div className="flex flex-row items-center gap-[12px]">
                            <div
                                className="cursor-pointer"
                                onClick={() => {
                                    setStep(AddStep.PreAdd);
                                    onAddOpen();
                                }}
                            >
                                添加
                            </div>
                            {
                                isAddOpen && (
                                    <AddGoodDialog
                                        open={isAddOpen}
                                        onOpenChange={(e) => {
                                            if (!e) {
                                                setStep(AddStep.PreAdd);
                                            }
                                            onAddOpenChange(e);
                                        }}
                                        goodId={row.original.goodId}
                                    />
                                )
                            }
                            <div
                                className="cursor-pointer"
                                onClick={() => {
                                    setBuyStep(BuyStep.PreBuy);
                                    onBuyOpen();
                                }}
                            >
                                購買
                            </div>
                            {
                                isBuyOpen && (
                                    <BuyGoodDialog
                                        open={isBuyOpen}
                                        onOpenChange={(e) => {
                                            if (!e) {
                                                setBuyStep(BuyStep.PreBuy);
                                            }
                                            onBuyOpenChange(e);
                                        }}
                                        good={row.original}
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
        const response = await queryGoodListAPI({
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
        data: data?.data as unknown as Good[],
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