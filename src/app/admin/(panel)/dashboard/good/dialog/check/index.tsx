import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import { Good } from "../../types";
import { Button } from "@/components/ui/button";
interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: Good;
}

export default function CheckDialog({ open, onOpenChange, data }: Props) {
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[400px]"
        >
            <div className="flex flex-col gap-2">
                <div>
                    <div className="text-[14px] text-[#8E95A9]">名称</div>
                    <div
                        className="bg-[#F8FAFC] h-[46px] flex items-center rounded-[4px] p-2">
                        {data.name}
                    </div>
                </div>
                <div>
                    <div className="text-[14px] text-[#8E95A9]">来源</div>
                    <div
                        className="bg-[#F8FAFC] h-[46px] flex items-center rounded-[4px] p-2"
                    >
                        {data.source}
                    </div>
                </div>
                <div>
                    <div className="text-[14px] text-[#8E95A9]">分类</div>
                    <div
                        className="bg-[#F8FAFC] h-[46px] flex items-center rounded-[4px] p-2"
                    >
                        {data.category}
                    </div>
                </div>
                <div>
                    <div className="text-[14px] text-[#8E95A9]">价格</div>
                    <div
                        className="bg-[#F8FAFC] h-[46px] flex items-center rounded-[4px] p-2"
                    >
                        {data.price}
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-[14px] text-[#8E95A9]">政策</div>
                    <div className="flex flex-row gap-1 bg-[#F8FAFC] h-[46px] flex items-center rounded-[4px] p-2">
                        {
                            data.policys?.map((item) => (
                                <span
                                    key={item}
                                    className="text-[14px] text-[#8E95A9]"
                                >
                                    {item}
                                </span>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <div className="text-[14px] text-[#8E95A9]">创建时间</div>
                    <div
                        className="bg-[#F8FAFC] h-[46px] flex items-center rounded-[4px] p-2"
                    >
                        {data.createdAt}
                    </div>
                </div>
                <div>
                    <div className="text-[14px] text-[#8E95A9]">更新时间</div>
                    <div
                        className="bg-[#F8FAFC] h-[46px] flex items-center rounded-[4px] p-2"
                    >
                        {data.updatedAt}
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button
                        className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                        onClick={() => onOpenChange(false)}
                    >
                        关闭
                    </Button>
                </div>
            </div>
        </WrapperDialog>
    )
}