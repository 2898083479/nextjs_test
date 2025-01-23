"use client"
import { DashboardOverview } from "./component/ui/dashboard-overview"
import { DashboardAdvertising } from "./component/ui/dashboard-advertising"

export const DashboardPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <DashboardAdvertising />
            <DashboardOverview />
        </div>
    )
}

export default DashboardPage