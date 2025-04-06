'use client'

import StoreTable from "./store-table";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const SettingMyStorePage = () => {
    const router = useRouter()
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
            router.push('/user/signin')
        }
    }, [])
    return (
        <div className="flex flex-col gap-2">
            <div>
                <Button
                    type="button"
                    className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80 text-white"
                >
                    创建个人店铺
                </Button>
            </div>
            <StoreTable />
        </div>
    )
}

export default SettingMyStorePage;