"use client"
import { DashboardOverview } from "./component/ui/dashboard-overview"
import { DashboardAdvertising } from "./component/ui/dashboard-advertising"
import { DashboardCard } from "./component/ui/dashboard-card"
import { Admin } from "./merchant/types"

interface Props {
    admin: Admin
}

export const DashboardPage = ({ admin }: Props) => {
    return (
        <div className="flex flex-col gap-4">
            <DashboardCard admin={admin}/>
            <DashboardAdvertising />
            <DashboardOverview />
        </div>
    )
}

export default DashboardPage