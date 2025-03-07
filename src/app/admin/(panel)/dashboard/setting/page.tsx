'use client'

import { CardPage } from "./card/page"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export const SettingPage = () => {
    const router = useRouter()
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken")
        if (!accessToken) {
            router.push("/admin/signin")
        }
    }, [])
    return (
        <div>
            <CardPage />
        </div>
    )
}

export default SettingPage;