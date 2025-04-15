"use client"

import { Card, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Good } from "../../good/types"
import { useRouter } from "next/navigation"
interface Props {
    className?: string
    good: Good
}

export const DashboardCardGood = ({ good, className }: Props) => {
    const router = useRouter()
    return (
        <Card className={cn(className)}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <span>
                        <div>{good.name}</div>
                        <div className="text-sm text-gray-500">
                            <div>类别 {good.category}</div>
                            <div>来源 {good.source}</div>
                        </div>
                    </span>
                    <Button
                        variant="ghost"
                        onClick={() => {
                            router.push(`dashboard/good/`)
                        }}
                    >
                        <Eye />
                    </Button>
                </div>
            </CardHeader>
        </Card>
    )
}

export default DashboardCardGood