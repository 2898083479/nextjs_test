'use client'
import GoodTable from "./_table";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const GoodBuyClient = () => {
    const router = useRouter()
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
            router.push('/user/signin')
        }
    }, [])
    return (
        <div>
            <GoodTable />
        </div>
    )
}

export default GoodBuyClient;