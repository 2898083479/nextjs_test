import { useMemo } from "react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { getShoppingCarList } from "@/api/shoppingCar";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ShoppingCar } from "./types";
import { useDataTable } from "@/components/core/data-table/hook";
import { DataTable } from "@/components/core/data-table";
import DelSuccessDialog from "./del-dialog";
import ShoppingCarFilter from "./_filter";
import { Button } from "@/components/ui/button";
import { clearShoppingCarAPI } from "@/api/shoppingCar";
import { useUserStore } from "@/app/user/store";

const ShoppingCarTable = () => {
    const columns = useMemo<ColumnDef<ShoppingCar>[]>(() => [
        {
            id: 'name',
            header: 'Name',
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
            id: 'quantity',
            header: 'Quantity',
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
            header: 'Price',
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
            header: 'Total Price',
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
            header: 'Add Time',
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
            header: 'Action',
            size: 300,
            cell: ({ row }) => {
                const [isOpen, setIsOpen] = useState(false);
                return (
                    <>
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
                                    setIsOpen={setIsOpen}
                                />
                            )
                        }
                    </>
                )
            }
        }
    ], []);

    const queryShoppingCarList = async () => {
        const response = await getShoppingCarList();
        return response.data;
    }

    const { data, isLoading } = useQuery({
        queryKey: ["shoppingCarList"],
        queryFn: queryShoppingCarList,
    })

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 9,
    })

    const { table } = useDataTable({
        data: data as ShoppingCar[],
        columns,
        pagination,
        setPagination
    })

    const { userId } = useUserStore();

    const clearShoppingCar = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await clearShoppingCarAPI(userId);
    }

    return (
        <div className="flex flex-col gap-[12px]">
            <div className="flex flex-row justify-between">
                <div>
                    <ShoppingCarFilter />
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