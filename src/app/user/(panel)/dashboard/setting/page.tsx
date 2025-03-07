'use client'
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMerchantInfo } from "@/api/merchant";
import { useQuery } from "@tanstack/react-query";

const SettingInfoPage = () => {
    const router = useRouter()
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
            router.push('/user/signin')
        }
    }, [])
    const queryMerchantInfo = async () => {
        const response = await getMerchantInfo({
            id: ''
        })
        return response.data
    }
    const { data: merchantInfo, isLoading } = useQuery({
        queryKey: ['merchantSettingInfo'],
        queryFn: queryMerchantInfo,
    })
    return (
        <Card>
            <CardHeader>
                personal information
            </CardHeader>
            <CardContent>
                <div>
                    <div>
                        Name: {merchantInfo?.[0].name}
                    </div>
                    <div>
                        Email: {merchantInfo?.[0].email}
                    </div>
                    <div>
                        Store Count: 12
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SettingInfoPage;