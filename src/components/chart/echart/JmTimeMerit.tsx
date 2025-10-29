import { Box } from "@mui/material";
import type { EChartsOption } from "echarts";
import timeMerit from '../../../data/echarts_time_merit_profile_François_Ruffin_IPSOS.json';
import Chart from "../../share/Chart";

const timeMeritChartOption: EChartsOption = {
    ...(timeMerit as EChartsOption),
}

export const JmTimeMeritChart: React.FC = () => {
    return (
        <Box sx={{ width: 1, height: 1, }}>
            <Chart option={timeMeritChartOption} />
        </Box>
    )
}