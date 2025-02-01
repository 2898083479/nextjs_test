import { StoreStatus } from "./types";

export const StoreStatusChip = ({ status }: { status: StoreStatus }) => {
    return (
        <div className="flex items-center px-[20px] py-[16px] gap-[12px]">
            <div className="flex flex-col text-[14px] leading-[20px]">
                <span className="text-tp">{status}</span>
            </div>
        </div>
    )
}