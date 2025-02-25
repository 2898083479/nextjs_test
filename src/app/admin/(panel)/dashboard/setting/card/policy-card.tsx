'use client'

import { Policy } from "@/app/admin/(panel)/dashboard/policy/types"
import { Switch } from "@/components/ui/switch"
import { updateStatus } from "@/api/policy"
import { ResponseStatusCode } from "@/api/types"
import { useRouter } from "next/navigation"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Props {
    policy: Policy
}

export const PolicyCard = ({ policy }: Props) => {
    const [enable, setEnable] = useState(true)
    const router = useRouter()

    const changeStatus = async () => {
        const response = await updateStatus();
        if (response.code !== ResponseStatusCode.success) {
            setEnable(enable)
        }
        setEnable(!enable)
        console.log(enable)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex flex-row items-center gap-2">
                        {policy.name}
                        <div className="ml-auto">
                            <Button
                                variant="ghost"
                                onClick={() => router.push("info")}
                            >
                                Detail
                            </Button>
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent
                className="bg-slate-100"
            >
                {policy.description}
            </CardContent>
            <CardFooter className="flex justify-end">
                <Switch
                    checked={!enable}
                    onCheckedChange={changeStatus}
                />
            </CardFooter>
        </Card>
    )
}

export default PolicyCard;