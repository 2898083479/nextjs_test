'use client'

import { PolicyCard } from "./policy-card"
import { useQuery } from "@tanstack/react-query"
import { queryPolicyList } from "@/api/policy"
import { Policy } from "../../policy/types"
import { useGoodStore } from "../../good/store"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"

export const CardPage = () => {
    const { goodId } = useGoodStore();
    const [addPolicy, setAddPolicy] = useState(false);

    const getPolicyList = async () => {
        console.log(goodId)
        if (goodId) {
            const response = await queryPolicyList(
                {
                    goodId: goodId
                }
            )
            return response.data
        }
        const response = await queryPolicyList()
        return response.data
    }

    const { data: policyList, refetch } = useQuery({
        queryKey: ["policyList"],
        queryFn: getPolicyList
    })

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex justify-end">
                    <Button
                        type="button"
                        className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                        onClick={() => setAddPolicy(true)}
                    >
                        添加政策
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {policyList?.map((policy) => (
                        <PolicyCard
                            key={policy.id}
                            policy={policy as unknown as Policy}
                            refetch={refetch}
                        />
                    ))}
                </div>
            </div>
            {
                addPolicy && (
                    <WrapperDialog
                        open={addPolicy}
                        onOpenChange={setAddPolicy}
                        className="w-full max-w-md"
                        >
                            <div>
                                TODO: 添加政策
                            </div>
                    </WrapperDialog>
                )
            }
        </>
    )
}

export default CardPage;