"use client"

import * as React from "react"
import { Store } from "../../store/types"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardHeader,
} from "@/components/ui/card"
import { Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
interface Props {
    store: Store
    className?: string
}

export const DashboardCardStore = ({ store, className }: Props) => {
    const router = useRouter()
    return (
        <Card className={cn(className)}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <span>
                        <div>{store.name}</div>
                        <div className="text-sm text-gray-500">
                            {store.email}
                        </div>
                    </span>
                    <Button
                        variant="ghost"
                        onClick={() => {
                            router.push('dashboard/store')
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