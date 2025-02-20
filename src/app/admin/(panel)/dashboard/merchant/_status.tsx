import { MerchantStatus } from "./types"
import classNames from "classnames"

const colors = {
    [MerchantStatus.Inactive]: 'bg-[#F3F3F3]',
    [MerchantStatus.Pending]: 'bg-[#0C7FDA]',
    [MerchantStatus.Approved]: 'bg-[#00B42A]',
    [MerchantStatus.Rejected]: 'bg-[#FF4D4F]',
}

export const MerchantStatusChip = ({ status }: { status: MerchantStatus }) => {
    return (
        <div
            className={classNames(
                'flex w-[90px] p-[6px_24px] items-center justify-center rounded-md',
                colors[status]
            )}
        >
            {status}
        </div>
    )
}