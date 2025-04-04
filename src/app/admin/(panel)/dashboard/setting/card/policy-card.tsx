'use client'

import { Policy, PolicyStatus } from "@/app/admin/(panel)/dashboard/policy/types"
import { Switch } from "@/components/ui/switch"
import { togglePolicyStatusAPI } from "@/api/policy"
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
import { usePolicyStore } from "../store"

interface Props {
    policy: Policy
    refetch: () => void
}

export const PolicyCard = ({ policy, refetch }: Props) => {
    const [enable, setEnable] = useState(true)
    const { policyInfo, setPolicyInfo } = usePolicyStore()
    const router = useRouter()
    const changeStatus = async () => {
        const response = await togglePolicyStatusAPI(policy.id);
        if (response.code !== ResponseStatusCode.success) {
            setEnable(enable)
        }
        setEnable(!enable)
        refetch()
    }   

    const checkDetail = () => {
        setPolicyInfo(policy)
        router.push('setting/info')
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
                                onClick={checkDetail}
                            >
                                Detail
                            </Button>
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent
                className="bg-slate-100 h-[167.5px] opacity-60 transition-opacity duration-300 hover:opacity-100"
            >
                {policy.description}
            </CardContent>
            <CardFooter className="flex justify-end pr-0">
                <Switch
                    checked={
                        policy.status === PolicyStatus.ACTIVE
                    }
                    onCheckedChange={changeStatus}
                    className="data-[state=checked]:bg-green-500 mt-2 mr-2"
                />
            </CardFooter>
        </Card>
    )
}

export default PolicyCard;