import StoreInfoCard from "./storeInfo-card";
import { useQuery } from "@tanstack/react-query";
import { getStoreInfoList } from "@/api/store/index";
import { Store } from "@/app/admin/(panel)/dashboard/store/types";
import { Loader } from "lucide-react";
import StoreFilter from "./_filter";
import { useStoreFilter } from "./filter.hook";

const StoreTable = () => {
    const accessToken = localStorage.getItem("accessToken")
    const { search } = useStoreFilter();
    const queryStoreList = async () => {
        const response = await getStoreInfoList("", {
            search: "",
            merchantCount: 0,
            goodCount: 0,
        })
        return response.data;
    }

    const { data: storeList, isLoading } = useQuery({
        queryKey: ["storeList", search],
        queryFn: queryStoreList,
        select: (data) => 
            search
                ? data.filter((item) => item.name.includes(search))
                : data,
        enabled: !!accessToken,
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
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 4xl:grid-cols-5 gap-4">
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