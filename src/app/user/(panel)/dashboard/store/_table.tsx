import StoreInfoCard from "./storeInfo-card";
import { useQuery } from "@tanstack/react-query";
import { getStoreInfoList } from "@/api/store/index";
import { Store } from "@/app/admin/(panel)/dashboard/store/types";
import { Loader } from "lucide-react";
import StoreFilter from "./_filter";

const StoreTable = () => {
    const queryStoreList = async () => {
        const response = await getStoreInfoList({
            search: "",
            merchantCount: 0,
            goodCount: 0,
        })
        return response.data;
    }

    const { data: storeList, isLoading } = useQuery({
        queryKey: ["storeList"],
        queryFn: queryStoreList,
    })

    return (
        <div className="flex flex-col gap-4">
            <div>
                <StoreFilter />
            </div>
            <div>
                {
                    isLoading ? (
                        <span className="flex items-center justify-center">
                            <Loader className="animate-spin" /> Loading...
                        </span>
                    ) : (
                        <div className="grid grid-cols-3 gap-4">
                            {
                                storeList?.map((store) => (
                                    <StoreInfoCard key={store.storeId} store={store as unknown as Store} />
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}
export default StoreTable;