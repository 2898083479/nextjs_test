'use client'

import { GoodDataTable } from "./_table";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Client() {
    const router = useRouter()
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken")
        if (!accessToken) {
            router.push("/admin/signin")
        }
    }, [router])
    return (
        <div>
            <GoodDataTable />
        </div>
    )
}