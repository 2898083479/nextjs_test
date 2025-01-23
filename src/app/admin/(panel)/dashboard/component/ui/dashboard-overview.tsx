'use client'
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { faker } from "@faker-js/faker"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const chartData = [
    { month: "January", desktop: faker.number.int({ min: 100, max: 300 }), mobile: faker.number.int({ min: 100, max: 300 }) },
    { month: "February", desktop: faker.number.int({ min: 100, max: 300 }), mobile: faker.number.int({ min: 100, max: 300 }) },
    { month: "March", desktop: faker.number.int({ min: 100, max: 300 }), mobile: faker.number.int({ min: 100, max: 300 }) },
    { month: "April", desktop: faker.number.int({ min: 100, max: 300 }), mobile: faker.number.int({ min: 100, max: 300 }) },
    { month: "May", desktop: faker.number.int({ min: 100, max: 300 }), mobile: faker.number.int({ min: 100, max: 300 }) },
    { month: "June", desktop: faker.number.int({ min: 100, max: 300 }), mobile: faker.number.int({ min: 100, max: 300 }) },
    { month: "July", desktop: faker.number.int({ min: 100, max: 300 }), mobile: faker.number.int({ min: 100, max: 300 }) },
    { month: "August", desktop: faker.number.int({ min: 100, max: 300 }), mobile: faker.number.int({ min: 100, max: 300 }) },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    },
    mobile: {
        label: "Mobile",
        color: "#60a5fa",
    },
} satisfies ChartConfig

export const DashboardOverview = () => {
    return (
        <Card>
            <CardHeader>
                概况
            </CardHeader>
            <CardContent className="flex justify-center">
                <ChartContainer config={chartConfig} className="min-h-[300px] w-[80%]">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default DashboardOverview