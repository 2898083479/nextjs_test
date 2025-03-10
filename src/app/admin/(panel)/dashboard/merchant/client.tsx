"use client"
import { MerchantDataTable } from "./_table";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MerchantPanel() {
    const router = useRouter()

    // useEffect(() => {
    //     const accessToken = localStorage.getItem("accessToken")
    //     if (!accessToken) {
    //         router.push("/admin/signin")
    //     }
    // }, [])

    return (
        <div>
            <MerchantDataTable />
        </div>
    )
} 