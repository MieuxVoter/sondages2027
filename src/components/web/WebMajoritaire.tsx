import { Box, Typography } from "@mui/material"
import { JmRankingChart } from "../chart/JmRankingChart"

export const WebMajoritaire: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', p: 6 }}>
            <Typography variant="h4"> Le Jugement Majoritaire</Typography>
            <Box sx={{ width: "100%", height: "600px" }}>
                <JmRankingChart />
            </Box>
            
        </Box>

    )
}