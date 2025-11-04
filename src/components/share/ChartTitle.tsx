import { Box, Typography } from "@mui/material"
import type { FC } from "react"


interface ChartTitleProps {
    title: string,
    subtitle1: string,
    subtitle2?: string,
}

export const ChartTitle: FC<ChartTitleProps> = ({title, subtitle1, subtitle2}) => {
    return (
        <Box>
            <Typography variant="h5" color="primary">{title}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
                {subtitle1}
            </Typography>
            {subtitle2 && <Typography variant="subtitle1" color="text.secondary">
                {subtitle2}
            </Typography>}
        </Box>
    )
}