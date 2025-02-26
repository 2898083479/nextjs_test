"use client"
import { DashboardOverview } from "./component/ui/dashboard-overview"
import { DashboardCard } from "./component/ui/dashboard-card"
import { Merchant } from "./merchant/types"

interface Props {
    merchant: Merchant
}

export const DashboardPage = ({ merchant }: Props) => {
    return (
        <div className="flex flex-col gap-4">
            <DashboardOverview />
            <DashboardCard />
        </div>
    )
}

export default DashboardPage