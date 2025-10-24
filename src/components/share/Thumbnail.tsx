import { Box, type SxProps } from "@mui/material";
import type { FC, PropsWithChildren } from "react";
import { useElementSize } from "../../hooks/useElementSize";

interface ThumbnailProps {
    originalSize?: {
        width: number
        height: number
    }
    sx?: SxProps
}

export const Thumbnail: FC<PropsWithChildren<ThumbnailProps>> = ({ sx, originalSize = { width: 1200, height: 600 }, children }) => {
    const { ref, width, height } = useElementSize();

    const containerWidth = width || 1;
    const containerHeight = height || 1;

    const isFullHeight = containerWidth / containerHeight < originalSize.width / originalSize.height;
    const scale = !isFullHeight ? containerHeight / originalSize.height : containerWidth / originalSize.width;
    return (
        <Box ref={ref} sx={{
            ...sx,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Box sx={{
                width: originalSize.width * scale,
                height: originalSize.height * scale,
            }}>
                <Box sx={{
                    transform: `scale(${scale})`,
                    width: originalSize.width,
                    height: originalSize.height,
                    transformOrigin: 'top left',
                }}>
                    {children}
                </Box>
                
            </Box>
        </Box>
    )
}
