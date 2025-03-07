'use client'

import StoreTable from "./_table";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const StoreBuyClient = () => {
    const router = useRouter()
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
            router.push('/user/signin')
        }
    }, [])
    return (
        <div>
            <StoreTable />
        </div>
    )
}

export default StoreBuyClient;