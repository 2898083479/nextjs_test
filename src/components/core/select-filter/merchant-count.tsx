import {
    Select,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
interface MerchantCountSelectProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export const MerchantCountSelect = ({ value, onChange, className }: MerchantCountSelectProps) => {
    return (
        <Select
            value={value}
            onValueChange={(value) => onChange(value)}
        >
            <SelectTrigger
                className={cn("max-w-[204px] h-[40px] bg-white", className)}
            >
                <SelectValue className="text-tp" placeholder={"Merchant Count"} />
            </SelectTrigger>
            <SelectContent className="text-[#94A3B8]">
                {
                    amountOptions.map((option) => (
                        <SelectItem
                            key={option.amount}
                            value={option.amount.toString()}
                            onClick={() => onChange(option.amount.toString())}
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
        amount: 1,
        label: ">=1"
    },
    {
        amount: 5,
        label: ">=5"
    },
    {
        amount: 10,
        label: ">=10"
    },
    {
        amount: 20,
        label: ">=20"
    }
]