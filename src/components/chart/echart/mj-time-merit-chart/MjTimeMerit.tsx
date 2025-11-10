import { Box } from "@mui/material";
import type { EChartsOption } from "echarts";
import { useSelector } from "react-redux";
import { graphColor } from "../../../../colors";
import { selectPt1Dates, selectTimeMeritChartSeriesByCandidateIdForECharts } from "../../../../store/jm-slice/jm-selector";
import type { RootState } from "../../../../store/store";
import Chart from "../../../share/Chart";
import { ChartTitle } from "../../../share/ChartTitle";
import { BorderLayout } from "../../../share/layout/BorderLayout";
import { timeMeritConfig } from "./timeMeritConfig";

interface MjTimeMeritChartProps {
    isThumbnail?: boolean;
}

export const MjTimeMeritChart: React.FC<MjTimeMeritChartProps> = ({ isThumbnail = false }) => {
    const timeMeritChartSerie = useSelector((state: RootState) => selectTimeMeritChartSeriesByCandidateIdForECharts(state, "FR"));
    const pt1Dates = useSelector(selectPt1Dates);

    const timeMeritChartOption: EChartsOption = {
        ...timeMeritConfig,
        xAxis: {
            ...timeMeritConfig.xAxis,
            data: pt1Dates.map(d => d.date).reverse(),
        },
        legend: isThumbnail ? { show: false } : timeMeritConfig.legend,
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
        <BorderLayout
            north={!isThumbnail &&
                <ChartTitle
                    title="Évolution des mentions pour François Ruffin"
                    subtitle1="Source : IPSOS - La Tribune Dimanche"
                />
            }
            center={
                <Box sx={{ width: 1, height: 1 }}>
                    <Chart option={timeMeritChartOption} />
                </Box>
            }
        />
    )
}
