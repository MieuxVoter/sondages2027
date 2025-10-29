import { Box } from "@mui/material"
import type { FC } from "react"
import { JmMeritChart } from "../../chart/echart/JmMeritChart"

export const WebMeritChart : FC = () => {
     return (
        <Box sx={{ width: '100%', height: '600px', p: 4 }}>
            <JmMeritChart />
        </Box>
    )
}