'use client'

import { PolicyCard } from "./policy-card"
import { useQuery } from "@tanstack/react-query"
import { queryPolicyList } from "@/api/policy"
import { Policy } from "../../policy/types"

export const CardPage = () => {

    const getPolicyList = async () => {
        const response = await queryPolicyList()
        return response.data
    }

    const { data: policyList } = useQuery({
        queryKey: ["policyList"],
        queryFn: getPolicyList
    })

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {policyList?.map((policy) => (
                <PolicyCard key={policy.id} policy={policy as Policy} />
            ))}
        </div>
    )
}

export default CardPage;