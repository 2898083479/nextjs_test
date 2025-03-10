'use client'
import { StoreDataTable } from "./_table";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StorePanel() {
    const router = useRouter()
    // useEffect(() => {
    //     const accessToken = localStorage.getItem("accessToken")
    //     if (!accessToken) {
    //         router.push("/admin/signin")
    //     }
    // }, [])
    return (
        <div>
            <StoreDataTable />
        </div>
    )
}