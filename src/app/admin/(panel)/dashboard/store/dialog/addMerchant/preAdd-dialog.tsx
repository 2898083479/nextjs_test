import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";
import { useQuery } from "@tanstack/react-query";
import { getMerchantInfo } from "@/api/merchant";
import { queryMerchantListByStoreAPI } from "@/api/store";
import { Merchant } from "../../../merchant/types";
import { Loader } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"
import { useMerchantStore } from "@/app/admin/(panel)/dashboard/store/store";
import { AddMerchantToStoreAPI } from "@/api/store";
import { ResponseStatusCode } from "@/api/types";
import { useAddStore, AddStep } from "@/app/admin/(panel)/dashboard/store/store";
import { Button } from "@/components/ui/button";

interface Props {
    storeId: string;
    open: boolean
    onOpenChange: (open: boolean) => void
}

const PreAddDialog = ({ storeId, open, onOpenChange }: Props) => {
    const { merchants, setMerchants } = useMerchantStore();
    const { setStep } = useAddStore();

    const { data: merchantList, isLoading } = useQuery({
        queryKey: ["merchantList"],
        queryFn: () => getMerchantInfo(
            undefined,
        ),
    });

    const { data: merchantResponse } = useQuery({
        queryKey: ["merchantListByStore"],
        queryFn: () => queryMerchantListByStoreAPI(storeId),
    });

    const toggleMerchant = (id: string) => {
        const updatedMerchants = merchants.includes(id)
            ? merchants.filter(merchantId => merchantId !== id)
            : [...merchants, id];

        // Update the store with the new merchants array
        useMerchantStore.setState({ merchants: updatedMerchants });
        console.log('updated merchants', updatedMerchants);
        setMerchants(updatedMerchants);
    };

    const addMerchantToStore = async () => {
        const res = await AddMerchantToStoreAPI(storeId, merchants)
        if (res.code === ResponseStatusCode.success) {
            setStep(AddStep.AddSuccess);
        } else {
            setStep(AddStep.AddFailed);
        }
    }

    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[400px] border-none"
        >
            <div className="flex flex-col gap-4">
                <div className="text-lg font-bold">新增店员</div>
                <div>
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <Loader className="animate-spin" />
                        </div>
                    ) : (
                        <div>
                            {Object.values(merchantList?.data as unknown as Merchant[]).map((merchant) => (
                                <div key={merchant.merchantId} className="flex items-center gap-2">
                                    <Checkbox
                                        checked={merchants.includes(merchant.merchantId)}
                                        onCheckedChange={() => {
                                            toggleMerchant(merchant.merchantId)
                                        }}
                                    />
                                    <span>{merchant.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex justify-end gap-2">
                    <Button
                        className="text-[#0C7FDA] border-[#0C7FDA]"
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        取消
                    </Button>
                    <Button
                        className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                        onClick={() => {
                            addMerchantToStore()
                            setMerchants([])
                        }}
                    >
                        確定
                    </Button>
                </div>
            </div>
        </WrapperDialog>
    );
};

export default PreAddDialog;