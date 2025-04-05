import {
    Card,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui/card";
import { Store } from "@/app/admin/(panel)/dashboard/store/types"
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";
import { QueryGoodListofStoreAPI } from "@/api/store";
import { GoodListofStore } from "@/api/store/types";
import AddGoodDialog from "../good/dialog/addGood";
import BuyGoodDialog from "../good/dialog/buyGood";
import { Good } from "@/app/admin/(panel)/dashboard/good/types";

interface Props {
    store: Store;
}

const StoreInfoCard = ({ store }: Props) => {
    const [buy, setBuy] = useState(false);
    const [goodList, setGoodList] = useState<GoodListofStore[]>([]);
    const [addGood, setAddGood] = useState(false);
    const [buyGood, setBuyGood] = useState(false);
    const [selectedGood, setSelectedGood] = useState<Good>();

    const getGoodList = async () => {
        const { data: goodList } = await QueryGoodListofStoreAPI(store.storeId);
        setGoodList(goodList);
    }

    return (
        <>
            <Card className="bg-[#e0e7ff] hover:bg-[#e0e7ff]/80 transition-all duration-300 h-[360px] w-full max-w-md mx-auto">
                <CardHeader className="h-[100px]">
                    <div className="flex flex-col gap-2">
                        <div className="break-words text-lg font-semibold">
                            {store.name}
                        </div>
                        <div className="break-words text-sm text-gray-600">
                            {store.email}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="h-[200px]">
                    <div className="flex flex-col gap-2">
                        <div className="break-words h-[140px] text-sm text-gray-700">
                            {store.description}
                        </div>
                        <div className="break-words text-sm text-gray-600">
                            商品數量：{store.goodCount}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <div
                        className="cursor-pointer text-blue-600 hover:underline"
                        onClick={() => {
                            // TODO: 弹出该店铺的商品列表
                            setBuy(true);
                            getGoodList();
                        }}
                    >
                        查看商品
                    </div>
                </CardFooter>
            </Card>
            {
                buy && (
                    <WrapperDialog
                        open={buy}
                        onOpenChange={setBuy}
                        className="max-w-[600px]"
                    >
                        <div className="rounded-[4px] overflow-hidden border border-[#CBD5E1]">
                            <Table className="min-h-[112px]">
                                <TableHeader className="bg-[#CBD5E1]">
                                    <TableRow>
                                        <TableHead className="px-4 py-3 text-ts">商品名稱</TableHead>
                                        <TableHead className="px-4 py-3 text-ts">商品價格</TableHead>
                                        <TableHead className="px-4 py-3 text-ts">商品數量</TableHead>
                                        <TableHead className="px-4 py-3 text-ts text-center">操作</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        goodList.length > 0 ? (
                                            goodList?.map((good) => (
                                                <TableRow key={good.goodId}>
                                                    <TableCell className="px-4 py-3 text-ts">
                                                        {good.name}
                                                    </TableCell>
                                                    <TableCell className="px-4 py-3 text-ts">
                                                        {good.price}
                                                    </TableCell>
                                                    <TableCell className="px-4 py-3 text-ts">
                                                        {good.count}
                                                    </TableCell>
                                                    <TableCell className="flex flex-row gap-2 text-ts text-center">
                                                        <div
                                                            className="cursor-pointer"
                                                            onClick={() => {
                                                                setSelectedGood(good as unknown as Good);
                                                                setAddGood(true);
                                                            }}
                                                        >
                                                            添加到购物车
                                                        </div>
                                                        {
                                                            addGood && (
                                                                <AddGoodDialog
                                                                    open={addGood}
                                                                    onOpenChange={setAddGood}
                                                                    good={selectedGood as Good}
                                                                />
                                                            )
                                                        }
                                                        <div
                                                            className="cursor-pointer"
                                                            onClick={() => {
                                                                setSelectedGood(good as unknown as Good);
                                                                setBuyGood(true);
                                                            }}
                                                        >
                                                            直接购买
                                                        </div>
                                                        {
                                                            buyGood && (
                                                                <BuyGoodDialog
                                                                    open={buyGood}
                                                                    onOpenChange={setBuyGood}
                                                                    good={selectedGood as Good}
                                                                />
                                                            )
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center">
                                                    暂无商品
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    </WrapperDialog>
                )
            }
        </>
    )
}

export default StoreInfoCard;