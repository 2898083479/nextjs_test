'use client'

import { PolicyCard } from "./policy-card"
import { useQuery } from "@tanstack/react-query"
import { queryPolicyList } from "@/api/policy"
import { Policy } from "../../policy/types"
import { useGoodStore } from "../../good/store"
import { Button } from "@/components/ui/button"

export const CardPage = () => {
    const { goodId } = useGoodStore();

    const getPolicyList = async () => {
        const response = await queryPolicyList()
        return response.data
    }

    const { data: policyList } = useQuery({
        queryKey: ["policyList"],
        queryFn: getPolicyList
    })

    const addPolicyToGood = async () => {
        //TODO: 添加政策到商品
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-end">
                <Button 
                    type="button"
                    className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                    onClick={addPolicyToGood}
                >
                    添加政策
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {policyList?.map((policy) => (
                    <PolicyCard key={policy.id} policy={policy as unknown as Policy} />
                ))}
            </div>
        </div>

    )
}

export default CardPage;