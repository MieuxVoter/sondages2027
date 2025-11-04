import { Box, MenuItem, Select, Typography, useTheme } from "@mui/material";
import type { EChartsOption } from "echarts";
import { useState } from "react";
import { useSelector } from "react-redux";
import { graphColor } from "../../../../colors";
import { selectCandidateDistributionByPollIndex, selectMeritChartSeriesByPollIndexForECharts, selectPt1Dates } from "../../../../store/jm-slice/jm-selector";
import type { RootState } from "../../../../store/store";
import Chart from "../../../share/Chart";
import { ChartTitle } from "../../../share/ChartTitle";
import { BorderLayout } from "../../../share/layout/BorderLayout";
import { mjMeritChartConfig } from "./meritChatConfig";

interface MjMeritChartProps {
  isThumbnail?: boolean;
}

export const MjMeritChart: React.FC<MjMeritChartProps> = ({
  isThumbnail = false
}) => {
  const theme = useTheme();
  const [pollIndex, setPollIndex] = useState(0);

  const pt1Dates = useSelector(selectPt1Dates);
  const candidateDistributions = useSelector((state: RootState) => selectCandidateDistributionByPollIndex(state, pollIndex));
  const meritChartSeries = useSelector((state: RootState) => selectMeritChartSeriesByPollIndexForECharts(state, pollIndex));

  const meritChartOption: EChartsOption = {
    ...mjMeritChartConfig,
    yAxis: {
      ...mjMeritChartConfig.yAxis,
      data: candidateDistributions?.map(cd => cd.name) || [],
    },
    legend: isThumbnail ? { show: false } : mjMeritChartConfig.legend,
    series: (meritChartSeries || []).map((serie: any, index: number) => {
      const baseSerie = {
        type: 'bar' as const,
        stack: 'total',
        itemStyle: {
          color: graphColor.fiveGradeScale[index],
        },
        ...serie,
      };

      // Ajouter markLine sur la première série
      if (index === 0) {
        return {
          ...baseSerie,
          markLine: {
            symbol: 'none' as const,
            data: [{
              xAxis: 50,
              lineStyle: {
                color: theme.palette.primary.main,
                width: 2,
                type: 'solid' as const
              },
              label: {
                show: true,
                position: 'start' as const,
                formatter: '50%'
              }
            }],
            silent: true,
          }
        };
      }
      return baseSerie;
    }),
  }

  return (<>
    <BorderLayout
      north={!isThumbnail &&
        <ChartTitle
          title="Profide de mérite - sondage unique"
          subtitle1={`Comparaison du profile de mérite des différents candidats pour un sondage donné au scrutin majoritaire`}
        />}
      center={
        <Box sx={{ width: 1, height: 1, display: 'flex', flexDirection: 'column' }}>
          {
            !isThumbnail && <Box sx={{ }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "start", gap: 2 }}>
                <Typography color="text.secondary">Date du sondage :</Typography>
                <Select
                  size="small"
                  labelId="poll-select-label"
                  id="poll-select"
                  value={pollIndex}
                  onChange={(e) => setPollIndex(e.target.value as number)}
                >
                  {pt1Dates.map((dateObj) => (
                    <MenuItem key={dateObj.index} value={dateObj.index}>
                      {new Date(dateObj.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          }
          <Box sx={{ flex: 1 }}>
            <Chart option={meritChartOption} />
          </Box>
        </Box>
      }
    >

    </BorderLayout>

  </>


  )
}
