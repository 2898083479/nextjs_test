import PolicyTable from "./_table";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const Client = () => {
    const router = useRouter()
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken")
        if (!accessToken) {
            router.push("/admin/signin")
        }
    }, [])
    return (
        <div>
            <PolicyTable />
        </div>
    )
}

export default Client;