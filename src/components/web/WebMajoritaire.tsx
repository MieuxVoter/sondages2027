import { Box } from "@mui/material"
import { JmRankingChart } from "../chart/JmRankingChart"
import { Thumbnail } from "../share/Thumbnail"

export const WebMajoritaire: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', p: 6 }}>
            <Thumbnail key="thumb" sx={{ height: "100px",  mb: 4, width: 1 }}>
                <JmRankingChart />
            </Thumbnail>
            <Box sx={{ width: "100%", height: "600px" }}>
                <JmRankingChart />
            </Box>

        </Box>

    )
}