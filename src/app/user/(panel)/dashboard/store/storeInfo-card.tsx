'use client'

import {
    Card,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui/card";
import { Store } from "@/app/admin/(panel)/dashboard/store/types"
import { useRouter } from "next/navigation";
interface Props {
    store: Store;
}

const StoreInfoCard = ({ store }: Props) => {
    const router = useRouter();
    return (
        <Card>
            <CardHeader className="h-[127px]">
                <div className="flex flex-col gap-2">
                    <div className="break-words">
                        {store.name}
                    </div>
                    <div className="break-words">
                        {store.email}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="h-[250px]">
                <div className="flex flex-col gap-2">
                    <div className="break-words">
                        {store.description}
                    </div>
                    <div className="break-words">
                        {store.goodCount}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <div
                    className="cursor-pointer"
                    onClick={() => {
                        router.push('/user/dashboard/good')
                    }}
                >
                    details
                </div>
            </CardFooter>
        </Card>
    )
}

export default StoreInfoCard;