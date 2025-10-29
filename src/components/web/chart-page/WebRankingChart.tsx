import { Box } from "@mui/material"
import type { FC } from "react"
import { JmRankingChart } from "../../chart/echart/JmRankingChart"

export const WebRankingChart: FC = () => {
    return (
        <Box sx={{ width: '100%', height: '600px', p: 4 }}>
            <JmRankingChart />
        </Box>
    )
}

