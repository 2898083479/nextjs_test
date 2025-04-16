"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    Table,
    TableHeader,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import { getStoreInfoList, QueryGoodListofStoreAPI } from "@/api/store"
import { useParams } from "next/navigation"
import { useState } from "react"
import { GoodListofStore } from "@/api/store/types"

export const StoreInfoPage = () => {
    const [goodList, setGoodList] = useState<GoodListofStore[]>([]);
    const { storeId } = useParams()
    const { data } = useQuery({
        queryKey: ["storeInfo", storeId],
        queryFn: () => getStoreInfoList(storeId as string)
    })
    const getGoodList = async () => {
        const { data: goodList } = await QueryGoodListofStoreAPI(storeId as string);
        setGoodList(goodList);
    }
    return (
        <div>
            <Card>
                <CardContent>
                    <CardHeader>
                        <CardTitle>店铺信息</CardTitle>
                    </CardHeader>
                    <div className="flex flex-col gap-2">
                        <div>
                            <span>店铺名称</span>
                            <span>{data?.data[0].name}</span>
                        </div>
                        <div>
                            <span>店铺邮箱</span>
                            <span>{data?.data[0].email}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
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
                </CardContent>
            </Card>
        </div>
    )
}