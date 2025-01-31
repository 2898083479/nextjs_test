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
import { ChevronRight } from "lucide-react"
import { Admin } from "../../merchant/types"
import { useRouter } from "next/navigation"
interface Props {
    admin: Admin
}

export const DashboardCard = ({ admin }: Props) => {
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
                            查看更多
                            <ChevronRight className="w-5 h-5" />
                        </span>
                    </CardTitle>
                    <CardDescription>审核符合条件的店铺注册申请</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-row gap-4 items-center justify-center">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <DashboardCardStore key={index} admin={admin} className="w-1/3" />
                    ))}
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
                            查看更多
                            <ChevronRight className="w-5 h-5" />
                        </span>
                    </CardTitle>
                    <CardDescription>审核符合条件的商品</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-row gap-4 items-center justify-center">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <DashboardCardGood key={index} className="w-1/3" />
                    ))}
                </CardContent>
            </Card>
        </>
    )
}

export default DashboardCard