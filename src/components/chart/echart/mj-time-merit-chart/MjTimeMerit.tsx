import { Box, MenuItem, Select, Typography } from "@mui/material";
import type { EChartsOption } from "echarts";
import { useState } from "react";
import { useSelector } from "react-redux";
import { graphColor } from "../../../../colors";
import { selectCandidateInfo, selectCandidateOrderedByLatestRank, selectPt1DatesForCandidate, selectTimeMeritChartSeriesByCandidateIdForECharts } from "../../../../store/jm-slice/jm-selector";
import type { RootState } from "../../../../store/store";
import Chart from "../../../share/Chart";
import { ChartTitle } from "../../../share/ChartTitle";
import { BorderLayout } from "../../../share/layout/BorderLayout";
import { timeMeritConfig } from "./timeMeritConfig";

interface MjTimeMeritChartProps {
    isThumbnail?: boolean;
}

export const MjTimeMeritChart: React.FC<MjTimeMeritChartProps> = ({ isThumbnail = false }) => {
    const candidates = useSelector(selectCandidateOrderedByLatestRank)
    const [selectedCandidate, setSelectedCandidate] = useState<string>(candidates[0]?.candidateId)
    const candidateInfo = useSelector((state: RootState) => selectCandidateInfo(state, selectedCandidate))
    const timeMeritChartSerie = useSelector((state: RootState) => selectTimeMeritChartSeriesByCandidateIdForECharts(state, selectedCandidate));
    const pt1Dates = useSelector((state: RootState) => selectPt1DatesForCandidate(state, selectedCandidate) );

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
                    title={`Évolution des mentions pour ${candidateInfo?.name}`}
                    subtitle1="Source : IPSOS - La Tribune Dimanche"
                />
            }
            center={
                <Box sx={{ width: 1, height: 1, display: 'flex', flexDirection: 'column' }}>
                    {
                        !isThumbnail &&
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', gap: 2 }}>
                            <Typography color="text.secondary"> Candidat :</Typography>
                            <Select
                                size="small"
                                labelId="candidate-select-label"
                                id="candidate-select"
                                value={selectedCandidate}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setSelectedCandidate(e.target.value);
                                }}
                            >
                                {candidates?.map(({ candidateId, name}) => {
                                    return (
                                        <MenuItem key={candidateId} value={candidateId}>
                                            {name}
                                        </MenuItem>
                                    )
                                })
                                }
                            </Select>
                        </Box>
                    }
                    <Box sx={{ width: 1, height: 1 }}>
                        <Chart option={timeMeritChartOption} />
                    </Box>
                </Box>

            }
        />
    )
}
