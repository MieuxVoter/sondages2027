import { Box } from "@mui/material";
import type { EChartsOption } from "echarts";
import timeMerit from '../../../data/echarts_time_merit_profile_François_Ruffin_IPSOS.json';
import Chart from "../../share/Chart";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { selectTimeMeritChartSeriesByCandidateIdForECharts } from "../../../store/jm-slice/jm-selector";


const timeMeritChartOption: EChartsOption = {
    ...(timeMerit as EChartsOption),
}

export const MjTimeMeritChart: React.FC = () => {
    const timeMeritChartSerie = useSelector((state: RootState) => selectTimeMeritChartSeriesByCandidateIdForECharts(state, "FR"));

    // console.log("jmData:", timeMeritChartSerie);

    return (
        <Box sx={{ width: 1, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ width: 1, height: 400 }}>
                <Chart option={timeMeritChartOption} />
            </Box>
            <Box component="pre" sx={{ mt: 2, p: 2, bgcolor: 'grey.100', overflow: 'auto', fontSize: '0.75rem', maxHeight: 300 }}>
                <div>Serie data:</div>
                {JSON.stringify(timeMeritChartSerie, null, 2)}
            </Box>
        </Box>
    )
}