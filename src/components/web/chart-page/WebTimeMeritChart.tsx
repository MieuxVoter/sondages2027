import { Box } from "@mui/material"
import type { FC } from "react"
import { JmTimeMeritChart } from "../../chart/echart/JmTimeMerit"

export const WebTimeMeritChart: FC = () => {
    return (
        <Box sx={{ width: '100%', height: '600px', p: 4 }}>
             <JmTimeMeritChart />
        </Box>
    )
}