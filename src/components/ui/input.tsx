import * as React from "react"

import { cn } from "@/lib/utils"
import classNames from "classnames";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    width?: string;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    hidden?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, startContent, endContent, hidden, width, ...props }, ref) => {
        return (
            <div 
            className={classNames(
                "relative",
                hidden && "hidden",
            )}
            style={{ width: width }}
            >
                {
                    startContent && (
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center min-w-[20px] min-h-[20px]">
                            {startContent}
                        </div>
                    )
                }
                <input
                    type={type}
                    className={cn(
                        "flex w-full h-[38px] text-[16px] leading-[150%] font-normal not-italic rounded-md border border-input bg-white px-3 py-2 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
                        startContent ? 'pl-10' : '',
                        endContent ? 'pr-10' : '',
                        className
                    )}
                    style={{ width: width }}
                    ref={ref}
                    {...props}
                />
                {
                    endContent && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center min-w-[20px] min-h-[20px]">
                            {endContent}
                        </div>
                    )
                }
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
