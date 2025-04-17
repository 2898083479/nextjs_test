import * as React from "react"
import { DashboardCardStore } from "./dashboard-card-store"
import { DashboardCardGood } from "./dashboard-card-good"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ChevronRight, Loader } from "lucide-react"
import { Good } from "../../good/types"
import { Store, StoreStatus } from "../../store/types"
import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getStoreInfoList } from "@/api/store"
import { queryGoodListAPI } from "@/api/good"

export const DashboardCard = () => {
    const queryStoreList = async () => {
        const response = await getStoreInfoList("", "")
        return response.data
    }

    const { data: storeList, isLoading: storeLoading } = useQuery({
        queryKey: ["store-list"],
        queryFn: () => queryStoreList(),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    })

    const getGoodList = async () => {
        const response = await queryGoodListAPI()
        return response.data
    }

    const { data: goodList, isLoading: goodLoading } = useQuery({
        queryKey: ["good-list"],
        queryFn: getGoodList,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    })

    const router = useRouter()
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <span>店铺注册申请</span>
                        <span
                            className="flex items-end justify-end text-sm text-gray-500"
                            onClick={() => {
                                router.push("/admin/dashboard/store")
                            }}
                        >
                            <Button
                                variant="link"
                                size={"icon"}
                            >
                                查看更多
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </span>
                    </CardTitle>
                    <CardDescription>审核符合条件的店铺注册申请</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4 items-center justify-center">
                    {storeLoading ? (
                        <span className="flex items-center gap-2">
                            <Loader className="animate-spin" /> Loading...</span>
                    ) : (
                        storeList?.slice(0, 3).filter((store) => store.status === StoreStatus.Pending).map((store) => (
                            <DashboardCardStore key={store.storeId} store={store as unknown as Store} />
                        ))
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>
                        <span>商品审核</span>
                        <span
                            className="flex items-end justify-end text-sm text-gray-500"
                            onClick={() => {
                                router.push("/admin/dashboard/good")
                            }}
                        >
                            <Button
                                variant="link"
                                size={"icon"}
                            >
                                查看更多
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </span>
                    </CardTitle>
                    <CardDescription>审核符合条件的商品</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4 items-center justify-center">
                    {goodLoading ? (
                        <span className="flex items-center gap-2">
                            <Loader className="animate-spin" /> Loading...</span>
                    ) : (
                        goodList?.slice(0, 3).map((good) => (
                            <DashboardCardGood key={good.goodId} good={good as unknown as Good} />
                        ))
                    )}
                </CardContent>
            </Card>
        </>
    )
}

export default DashboardCard