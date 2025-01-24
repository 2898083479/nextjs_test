"use client"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Image } from "@/components/core/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
export const DashboardAdvertising = () => {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )
    return (
        <Card>
            <CardContent className="flex justify-center items-center pt-5">
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full max-w-[800px] h-[300px]"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent>
                        {Array.from({ length: 2 }).map((_, index) => (
                            <CarouselItem key={index}>
                                <img
                                    src={`/image/${index + 1}.png`}
                                    alt={`advertisement ${index + 1}`}
                                    className="w-full h-[300px] items-center justify-center"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </CardContent>
        </Card>
    )
}