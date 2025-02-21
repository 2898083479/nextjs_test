import { MerchantStatus } from "./types"
import classNames from "classnames"

const colors = {
    [MerchantStatus.Inactive]: 'bg-[#EAB8E4]',
    [MerchantStatus.Pending]: 'bg-[#0C7FDA]',
    [MerchantStatus.Approved]: 'bg-[#00B42A]',
    [MerchantStatus.Rejected]: 'bg-[#FF4D4F]',
}

export const MerchantStatusChip = ({ status }: { status: MerchantStatus }) => {
    return (
        <div
            className={classNames(
                'flex w-[90px] p-[6px_24px] items-center justify-center rounded-md text-white opacity-90',
                colors[status]
            )}
        >
            {status}
        </div>
    )
}