'use client'
import { 
    Card, 
    CardContent, 
    CardHeader 
} from "@/components/ui/card";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SettingInfoPage = () => {
    const router = useRouter()
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
            router.push('/user/signin')
        }
    }, [])
    return (
        <Card>
            <CardHeader>
                personal information
            </CardHeader>
            <CardContent>
                <div>
                    <div>
                        Name
                    </div>
                    <div>
                        Email
                    </div>
                    <div>
                        Store Count
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SettingInfoPage;