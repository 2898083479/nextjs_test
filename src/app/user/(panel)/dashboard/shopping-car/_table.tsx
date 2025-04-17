import { useMemo } from "react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { getShoppingCarList } from "@/api/shoppingCar";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ShoppingCar } from "./types";
import { useDataTable } from "@/components/core/data-table/hook";
import { DataTable } from "@/components/core/data-table";
import DelSuccessDialog from "./del-dialog";
import { Button } from "@/components/ui/button";
import { clearShoppingCarAPI } from "@/api/shoppingCar";
import CheckDialog from "./_check-dialog";
import { toast } from "sonner";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useShoppingCarFilter } from "./filter.hook";

const ShoppingCarTable = () => {
    const columns = useMemo<ColumnDef<ShoppingCar>[]>(() => [
        {
            id: 'name',
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
            id: 'quantity',
            header: '數量',
            size: 300,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        {row.original.quantity}
                    </div>
                )
            }
        },
        {
            id: 'price',
            header: '價格',
            size: 300,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        ¥ {row.original.price}
                    </div>
                )
            }
        },
        {
            id: 'totalPrice',
            header: '總價格',
            size: 300,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        ¥ {row.original.price * row.original.quantity}
                    </div>
                )
            }
        },
        {
            id: 'addTime',
            header: '添加時間',
            size: 300,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
                        {row.original.addTime}
                    </div>
                )
            }
        },
        {
            id: 'action',
            header: '操作',
            size: 300,
            cell: ({ row }) => {
                const [isOpen, setIsOpen] = useState(false);
                const [checkDialog, setCheckDialog] = useState(false);
                return (
                    <div className="flex items-center gap-[12px]">
                        <div
                            className="flex items-center px-[20px] py-[16px] gap-[12px] cursor-pointer"
                            onClick={() => setIsOpen(true)}
                        >
                            移除
                        </div>
                        {
                            isOpen && (
                                <DelSuccessDialog
                                    isOpen={isOpen}
                                    setIsOpen={() => {
                                        setIsOpen
                                    }}
                                    shoppingCarId={row.original.id}
                                />
                            )
                        }
                        <div
                            className="flex items-center px-[20px] py-[16px] gap-[12px] cursor-pointer"
                            onClick={() => {
                                setCheckDialog(true);
                            }}
                        >
                            购买
                        </div>
                        {
                            checkDialog && (
                                <CheckDialog
                                    open={checkDialog}
                                    onOpenChange={setCheckDialog}
                                    shoppingCar={row.original}
                                />
                            )
                        }
                    </div>
                )
            }
        }
    ], []);

    const merchantId = localStorage.getItem('merchantId') || "";
    const accessToken = localStorage.getItem('accessToken') || "";
    const { search, setSearch, reset } = useShoppingCarFilter();
    const queryShoppingCarList = async () => {
        const response = await getShoppingCarList(
            merchantId
        );
        return response.data;
    }

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["shoppingCarList", search],
        queryFn: queryShoppingCarList,
        select: (data) =>
            search
                ? data.filter((item) => item.goodName.includes(search))
                : data,
        enabled: !!accessToken,
    })

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 9,
    })

    const { table } = useDataTable({
        data: data as unknown as ShoppingCar[],
        columns,
        pagination,
        setPagination
    })


    const clearShoppingCar = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await clearShoppingCarAPI(merchantId);
        toast.success("已成功清空購物車");
        refetch();
    }

    if (data?.length === 0) {
        return (
            <div className="flex flex-col gap-[12px]">
                <div className="text-[18px] font-medium">
                    購物車為空，快去逛逛吧！
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-[12px]">
            <div className="flex flex-row justify-between">
                <div>
                    <div className="flex flex-row gap-[12px]">
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="搜索"
                            endContent={
                                <SearchIcon
                                    className="cursor-pointer"
                                    size={15}
                                />
                            }
                        />
                        <div
                            className="flex items-center cursor-pointer text-[#afafaf]"
                            onClick={reset}
                        >
                            重置
                        </div>
                    </div>
                </div>
                <div>
                    <Button
                        className="bg-destructive text-white hover:bg-destructive/80"
                        onClick={clearShoppingCar}
                    >
                        清空購物車
                    </Button>
                </div>
            </div>
            <DataTable
                table={table}
                isLoading={isLoading}
                pagination={pagination}
                setPagination={setPagination}
            />
        </div>
    );
}

export default ShoppingCarTable;