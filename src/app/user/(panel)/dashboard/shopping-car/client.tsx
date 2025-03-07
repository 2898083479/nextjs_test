'use client'

import ShoppingCarTable from "./_table";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ShoppingCarClient = () => {
    const router = useRouter()
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
            router.push('/user/signin')
        }
    }, [])
    return (
        <div>
            <ShoppingCarTable />
        </div>
    )
}

export default ShoppingCarClient;