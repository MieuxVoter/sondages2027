import { Box } from "@mui/material";
import Plot from "react-plotly.js";
import rankingPlotData from '../../../data/majority-judgment/plotly_ranking.json';
import type { FC } from "react";
import { Thumbnail } from "../../share/Thumbnail";

export function TestPlotly() {
    return (
        <Box sx={{ height: 1, width: 1, p: 2 }}>
            <Thumbnail originalSize={{ width: 1200, height: 1100 }} sx={{height: 250}}>
                <Plotly/>
            </Thumbnail>
            <Thumbnail originalSize={{ width: 1200, height: 1100 }} sx={{height: 400}}>
                <Plotly/>
            </Thumbnail>
            <Plotly/>
        </Box>
    )
}

const Plotly: FC = () => {
    return (
        <Plot
            data={rankingPlotData.data as unknown as Plotly.Data[]}
            layout={rankingPlotData.layout as unknown as Partial<Plotly.Layout>}
            style={{ width: '100%', height: '100%' }}
            useResizeHandler={true}
            config={{ responsive: true }}
        />
    )
}