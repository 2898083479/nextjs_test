'use client'

import {
    Card,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui/card";
import { Store } from "@/app/admin/(panel)/dashboard/store/types"
import { useRouter } from "next/navigation";
import { useStore } from "./store";

interface Props {
    store: Store;
}

const StoreInfoCard = ({ store }: Props) => {
    const router = useRouter();
    const { setStoreId } = useStore();
    return (
        <Card className="bg-[#d9f99d]">
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
                    <div className="break-words h-[167px]">
                        {store.description}
                    </div>
                    <div className="break-words">
                        商品數量：{store.goodCount}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <div
                    className="cursor-pointer"
                    onClick={() => {
                        setStoreId(store.id);
                        router.push('/user/dashboard/good')
                    }}
                >
                    Details
                </div>
            </CardFooter>
        </Card>
    )
}

export default StoreInfoCard;