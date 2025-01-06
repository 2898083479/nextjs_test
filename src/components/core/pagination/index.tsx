import {
    Pagination as ShadcnPagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useDeviceDetection } from "@/components/hooks";

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
    const device = useDeviceDetection();

    if (totalPages === 0) {
        return null;
    }

    return (
        <ShadcnPagination>
            <PaginationContent>
                <PaginationItem className={totalPages === 1 ? "hidden" : ""}>
                    <PaginationPrevious
                        className="cursor-pointer px-2 md:px-4"
                        onClick={() => {
                            if (currentPage === 0) return;
                            onPageChange(currentPage - 1);
                        }}
                    >
                        <span className="hidden md:block">Back</span>
                    </PaginationPrevious>
                </PaginationItem>

                <PaginationItems
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    size={device === "Mobile" ? 3 : 5}
                />

                <PaginationItem className={totalPages === 1 ? "hidden" : ""}>
                    <PaginationNext
                        className="cursor-pointer px-2 md:px-4"
                        onClick={() => {
                            if (currentPage === totalPages - 1) return;
                            onPageChange(currentPage + 1);
                        }}
                    >
                        <span className="hidden md:block">Next</span>
                    </PaginationNext>
                </PaginationItem>
            </PaginationContent>
        </ShadcnPagination>
    )
}

const PaginationItems = ({ size, currentPage, totalPages, onPageChange }: Props & { size: number }) => {
    if (totalPages <= size) {
        return (
            <>
                {
                    [...Array(totalPages)].map((_, index) => {
                        return (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    className="cursor-pointer w-[32px] h-[32px] md:w-[40px] md:h-[40px]"
                                    onClick={() => {
                                        onPageChange(index);
                                    }}
                                    isActive={index === currentPage}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })
                }
            </>
        )
    }
    if (currentPage < size) {
        return (
            <>
                {
                    [...Array(size)].map((_, index) => {
                        return (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    className="cursor-pointer w-[32px] h-[32px] md:w-[40px] md:h-[40px]"
                                    onClick={() => {
                                        onPageChange(index);
                                    }}
                                    isActive={index === currentPage}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })
                }
                <PaginationItem>
                    <PaginationEllipsis
                        className="cursor-pointer w-[32px] h-[32px] md:w-[40px] md:h-[40px]"
                        onClick={() => {
                            onPageChange(size);
                        }}
                    />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink
                        className="cursor-pointer w-[32px] h-[32px] md:w-[40px] md:h-[40px]"
                        isActive={totalPages === currentPage}
                        onClick={() => {
                            onPageChange(totalPages);
                        }}
                    >
                        {totalPages + 1}
                    </PaginationLink>
                </PaginationItem>
            </>
        )
    }

    if (currentPage > (totalPages - 1) - size) {
        return (
            <>
                <PaginationItem>
                    <PaginationLink
                        className="cursor-pointer w-[32px] h-[32px] md:w-[40px] md:h-[40px]"
                        isActive={currentPage === 0}
                        onClick={() => {
                            onPageChange(0);
                        }}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis
                        className="cursor-pointer w-[32px] h-[32px] md:w-[40px] md:h-[40px]"
                        onClick={() => {
                            onPageChange(totalPages - 1 - size);
                        }}
                    />
                </PaginationItem>
                {
                    [...Array(size)].map((_, index) => {
                        return (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    className="cursor-pointer w-[32px] h-[32px] md:w-[40px] md:h-[40px]"
                                    onClick={() => {
                                        onPageChange(totalPages - size + index);
                                    }}
                                    isActive={totalPages - size + index === currentPage}
                                >
                                    {`${(totalPages + 1) - size + index}`}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })
                }
            </>
        )
    }

    return (
        <>
            <PaginationItem>
                <PaginationLink
                    className="cursor-pointer w-[32px] h-[32px] md:w-[40px] md:h-[40px]"
                    isActive={currentPage === 0}
                    onClick={() => {
                        onPageChange(0);
                    }}
                >
                    1
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationEllipsis
                    className="cursor-pointer w-[32px] h-[32px] md:w-[40px] md:h-[40px]"
                    onClick={() => {
                        onPageChange(currentPage - Math.ceil(size / 2));
                    }}
                />
            </PaginationItem>
            {
                [...Array(size)].map((_, index) => {
                    return (
                        <PaginationItem key={index}>
                            <PaginationLink
                                className="cursor-pointer w-[32px] h-[32px] md:w-[40px] md:h-[40px]"
                                isActive={currentPage - Math.floor(size / 2) + index === currentPage}
                                onClick={() => {
                                    onPageChange(currentPage - Math.floor(size / 2) + index);
                                }}
                            >
                                {currentPage + 1 - Math.floor((size - 1) / 2) + index}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })
            }
            <PaginationItem>
                <PaginationEllipsis
                    className="cursor-pointer w-[32px] h-[32px] md:w-[40px] md:h-[40px]"
                    onClick={() => {
                        onPageChange(currentPage + Math.ceil(size / 2));
                    }}
                />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink
                    className="cursor-pointer w-[32px] h-[32px] md:w-[40px] md:h-[40px]"
                    isActive={totalPages === currentPage}
                    onClick={() => {
                        onPageChange(totalPages - 1);
                    }}
                >
                    {totalPages}
                </PaginationLink>
            </PaginationItem>
        </>
    )
}