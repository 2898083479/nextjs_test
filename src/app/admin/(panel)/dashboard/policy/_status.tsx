import { PolicyStatus } from './types';
import classNames from 'classnames';

const colors = {
    [PolicyStatus.ACTIVE]: 'bg-[#22c55e]',
    [PolicyStatus.DISABLED]: 'bg-[#e11d48]'
}

export const PolicyStatusChip = ({ status }: {status: PolicyStatus}) => {
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