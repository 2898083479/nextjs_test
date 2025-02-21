import { GoodCategory } from "./types";
import classNames from "classnames";
import { FlaskConical, Hammer, Pill, Armchair } from "lucide-react";
const icons = {
    [GoodCategory.SPICE]: <FlaskConical />,
    [GoodCategory.MEDICINE]: <Pill />,
    [GoodCategory.CARVING]: <Hammer />,
    [GoodCategory.FURNITURE]: <Armchair />,
}

export const GoodStatusChip = ({ category }: { category: GoodCategory }) => {
    return (
        <div className={classNames("flex items-center justify-center gap-2 opacity-90")}>
            {icons[category]} {category}
        </div>
    )
}
