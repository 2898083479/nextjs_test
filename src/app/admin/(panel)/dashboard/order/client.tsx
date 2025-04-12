'use client';
import OrderTable from "./_table";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const OrderClient = () => {
    const router = useRouter()
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
            router.push('/user/signin')
        }
    }, [])
    return (
        <div>
            <OrderTable />
        </div>
    )
}

export default OrderClient;