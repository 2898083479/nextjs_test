import { StoreStatus } from "./types";
import classNames from "classnames";

const colors = {
    [StoreStatus.Pending]: 'bg-[#0C7FDA]',
    [StoreStatus.Approved]: 'bg-[#00B42A]',
    [StoreStatus.Rejected]: 'bg-[#FF4D4F]',
}

export const StoreStatusChip = ({ status }: { status: StoreStatus }) => {
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