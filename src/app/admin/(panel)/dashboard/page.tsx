"use client"
import { DashboardOverview } from "./component/ui/dashboard-overview"
import { DashboardCard } from "./component/ui/dashboard-card"
import { Merchant } from "./merchant/types"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface Props {
    merchant: Merchant
}

export const DashboardPage = ({ merchant }: Props) => {
    const router = useRouter()
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken")
        if (!accessToken) {
            router.push("/admin/signin")
        }
    }, [])
    return (
        <div className="flex flex-col gap-4">
            <DashboardOverview />
            <DashboardCard />
        </div>
    )
}

export default DashboardPage