'use client';

import React, { useEffect, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton";


export const Image = ({ src, alt, width, height, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const img = new window.Image();
        img.src = src!;

        const handleLoad = () => {
            setIsLoading(false);
        };

        if (img.complete) {
            handleLoad();
        } else {
            img.addEventListener('load', handleLoad);
            img.addEventListener('error', () => setIsLoading(false)); // Handle load errors
        }

        return () => {
            img.removeEventListener('load', handleLoad);
            img.removeEventListener('error', () => setIsLoading(false));
        };
    }, [src]);

    return (
        <div style={{ width, height, position: 'relative' }} className={className}>
            {isLoading && (
                <Skeleton
                    className="absolute top-0 left-0 z-10"
                    style={{ 
                        width: '100%', 
                        height: '100%',
                        borderRadius: 'inherit',
                    }}
                />
            )}
            <img
                src={src}
                alt={alt}
                // className="absolute z-10 h-full object-cover"
                style={{ 
                    display: isLoading ? 'none' : 'block',
                    borderRadius: 'inherit',
                }}
                onLoad={() => {
                    setIsLoading(false);
                }}
                {...props}
            />
        </div>
    );
};