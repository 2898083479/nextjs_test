'use client'

import { useGoodStore } from "../../good/store";
import { useQuery } from "@tanstack/react-query";
import { queryPolicyList } from "@/api/policy";

export const PolicyPage = () => {
    const { goodId } = useGoodStore();

    const queryPolicyListByGoodId = async () => {
        const response = await queryPolicyList({
            goodId: goodId
        })
        return response.data;
    }

    const { data: policyList, isLoading } = useQuery({
        queryKey: ["policyList", goodId],
        queryFn: queryPolicyListByGoodId,
    })

    return (
        <div>
            <h1>Policy</h1>
            <p>Good ID: {goodId}</p>
            {
                policyList?.map((policy) => (
                    <p key={policy.id}>{policy.name}</p>
                ))
            }
        </div>
    )
}

export default PolicyPage;