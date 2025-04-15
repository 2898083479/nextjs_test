import { GoodCategory, GoodStatus } from "./types";
import classNames from "classnames";
import { FlaskConical, Hammer, Pill, Armchair } from "lucide-react";
const icons = {
    [GoodCategory.SPICE]: <FlaskConical />,
    [GoodCategory.MEDICINE]: <Pill />,
    [GoodCategory.CARVING]: <Hammer />,
    [GoodCategory.FURNITURE]: <Armchair />,
}
const colors = {
    [GoodStatus.Pending]: 'bg-[#0C7FDA]',
    [GoodStatus.Approved]: 'bg-[#00B42A]',
    [GoodStatus.Rejected]: 'bg-[#FF4D4F]',
}

export const GoodCategoryChip = ({ category }: { category: GoodCategory }) => {
    return (
        <div className={classNames("flex items-center justify-center gap-2 opacity-90")}>
            {icons[category]} {category}
        </div>
    )
}

export const GoodStatusChip = ({ status }: { status: GoodStatus }) => {
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
