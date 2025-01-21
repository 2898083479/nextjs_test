import { div } from "framer-motion/client"
import { AdminStatus } from "./types"
import classNames from "classnames"

const colors = {
    [AdminStatus.Inactive]: 'bg-[#F3F3F3]',
    [AdminStatus.Pending]: 'bg-[#0C7FDA]',
    [AdminStatus.Approved]: 'bg-[#00B42A]',
    [AdminStatus.Rejected]: 'bg-[#FF4D4F]',
}

export const AdminStatusChip = ({ status }: { status: AdminStatus }) => {
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