'use client'
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { getBarginOverview } from "@/api/dashboard"

const chartConfig = {
    merchant: {
        label: "Merchant",
        color: "#2563eb",
    },
    store: {
        label: "Store",
        color: "#60a5fa",
    },
    good: {
        label: "Good",
        color: "#60a5fa",
    },
} satisfies ChartConfig

export const DashboardOverview = () => {
    const { data } = useQuery({
        queryKey: ["barginOverview"],
        queryFn: getBarginOverview,
    })
    return (
        <Card>
            <CardHeader>
                概况
            </CardHeader>
            <CardContent className="flex justify-center">
                <ChartContainer config={chartConfig} className="min-h-[300px] w-[80%]">
                    <BarChart accessibilityLayer data={data?.data}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleString('default', { month: 'long', year: 'numeric' });
                            }}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="merchant" fill="var(--color-merchant)" radius={4} />
                        <Bar dataKey="store" fill="var(--color-store)" radius={4} />
                        <Bar dataKey="good" fill="var(--color-good)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default DashboardOverview