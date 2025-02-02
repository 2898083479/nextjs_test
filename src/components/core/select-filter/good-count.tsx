import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface GoodCountSelectProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export const GoodCountSelect = ({ value, onChange, className }: GoodCountSelectProps) => {
    return (
        <Select>
            <SelectTrigger
                value={value ?? ""}
                className={cn("max-w-[204px] h-[40px] bg-white", className)}
            >
                <SelectValue className="text-tp" placeholder="Good Count" />
            </SelectTrigger>
            <SelectContent className="text-[#94A3B8]">
                {
                    amountOptions.map((option) => (
                        <SelectItem
                            key={option.amount}
                            value={option.amount.toString()}
                        >
                            {option.label}
                        </SelectItem>
                    ))
                }
            </SelectContent>
        </Select>
    )
}

const amountOptions = [
    {
        amount: 100,
        label: ">=100"
    },
    {
        amount: 500,
        label: ">=500"
    },
    {
        amount: 700,
        label: ">=700"
    },
    {
        amount: 1000,
        label: ">=1000"
    }
]