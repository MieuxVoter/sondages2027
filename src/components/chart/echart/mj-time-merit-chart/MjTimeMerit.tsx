import { Box } from "@mui/material";
import type { EChartsOption } from "echarts";
import { useSelector } from "react-redux";
import { selectPt1Dates, selectTimeMeritChartSeriesByCandidateIdForECharts } from "../../../../store/jm-slice/jm-selector";
import type { RootState } from "../../../../store/store";
import Chart from "../../../share/Chart";
import { timeMeritConfig } from "./timeMeritConfig";
import { graphColor } from "../../../../colors";


export const MjTimeMeritChart: React.FC = () => {
    const timeMeritChartSerie = useSelector((state: RootState) => selectTimeMeritChartSeriesByCandidateIdForECharts(state, "FR"));
    const pt1Dates = useSelector(selectPt1Dates);

    const timeMeritChartOption: EChartsOption = {
        ...timeMeritConfig,
        xAxis: {
            ...timeMeritConfig.xAxis,
            data: pt1Dates.map(d => d.date).reverse(),
        },
        series: timeMeritChartSerie.map(({ name, data }: any, index: number) => (
            {
                name,
                type: 'line' as const,
                stack: 'total',
                smooth: true,
                lineStyle: {
                    width: 0.5,
                    color: graphColor.fiveGradeScale[index],
                },
                areaStyle: {
                    color: graphColor.fiveGradeScale[index],
                },
                emphasis: {
                    focus: 'series' as const
                },
                data,
                
            }
        ))
            || [],
    }

    return (
        <Box sx={{ width: 1, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ width: 1, height: 400 }}>
                <Chart option={timeMeritChartOption} />
            </Box>
            <Box component="pre" sx={{ mt: 2, p: 2, bgcolor: 'grey.100', overflow: 'auto', fontSize: '0.75rem', maxHeight: 300 }}>
                <div>Serie data:</div>
                {JSON.stringify(timeMeritChartOption, null, 2)}
            </Box>
        </Box>
    )
}