import * as React from "react"
import { Merchant } from "../../merchant/types"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Eye } from "lucide-react"
import { cn } from "@/lib/utils"
interface Props {
    merchant: Merchant
    className?: string
}

export const DashboardCardStore = ({ merchant, className }: Props) => {
    return (
        <Card className={cn(className)}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <span>
                        <div>百年沉香店铺</div>
                        <div className="text-sm text-gray-500">
                            chenxiang@example.com
                        </div>
                    </span>
                    <Button variant="ghost">
                        <Eye />
                    </Button>
                </div>
            </CardHeader>
        </Card>
    )
}

export default DashboardCardStore