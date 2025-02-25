import * as React from "react"
import { Store } from "../../store/types"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardHeader,
} from "@/components/ui/card"
import { Eye } from "lucide-react"
import { cn } from "@/lib/utils"
interface Props {
    store: Store
    className?: string
}

export const DashboardCardStore = ({ store, className }: Props) => {
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
                    <Button
                        variant="ghost"
                        onClick={() => {
                            console.log("store")
                            console.log(store)
                        }}
                    >
                        <Eye />
                    </Button>
                </div>
            </CardHeader>
        </Card>
    )
}

export default DashboardCardStore