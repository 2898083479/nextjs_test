'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const UserDashboardPage = () => {
    const router = useRouter()
    useEffect(() => {
        router.push('/user/dashboard/good')
    }, [])
    return null
}

export default UserDashboardPage;