import {
    Card,
    CardHeader,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Eye } from "lucide-react"
interface Props {
    className?: string
}

export const DashboardCardGood = ({ className }: Props) => {
    return (
        <Card className={cn(className)}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <span>
                        <div>沉香精雕</div>
                        <div className="text-sm text-gray-500">
                            使用优质沉香原料，精雕细琢，打造高品质沉香产品
                        </div>
                    </span>
                    <span>
                        <Eye />
                    </span>
                </div>
            </CardHeader>
        </Card>
    )
}

export default DashboardCardGood