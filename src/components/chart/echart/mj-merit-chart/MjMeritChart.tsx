import { Box, MenuItem, Select, Typography, Button } from "@mui/material";
import type { EChartsOption } from "echarts";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCandidateDistributionByPollIndex, selectMeritChartSeriesByPollIndexForECharts, selectPt1Dates } from "../../../../store/jm-slice/jm-selector";
import type { RootState } from "../../../../store/store";
import Chart from "../../../share/Chart";
import { ChartTitle } from "../../../share/ChartTitle";

import { mjMeritChartConfig } from "./meritChatConfig";

interface MjMeritChartProps {
  isThumbnail?: boolean;
  height?: number | string;
  controlMode?: 'select' | 'buttons';
  hideTitle?: boolean;
}

export const MjMeritChart: React.FC<MjMeritChartProps> = ({
  isThumbnail = false,
  height,
  controlMode = 'select',
  hideTitle = false
}) => {
  const [pollIndex, setPollIndex] = useState(0);

  const pt1Dates = useSelector(selectPt1Dates);
  const candidateDistributions = useSelector((state: RootState) => selectCandidateDistributionByPollIndex(state, pollIndex));
  const series = useSelector((state: RootState) => selectMeritChartSeriesByPollIndexForECharts(state, pollIndex));

  const meritChartOption: EChartsOption = {
    ...mjMeritChartConfig,
    yAxis: {
      ...(mjMeritChartConfig.yAxis as any),
      data: candidateDistributions.map(c => c.name)
    },
    series: series.map(s => ({
      ...s,
      type: 'bar',
      stack: 'total',
      label: {
        show: false
      },
      emphasis: {
        focus: 'series'
      }
    }))
  };

  return (<>
    <Box sx={{ width: 1, height: 1, display: 'flex', flexDirection: 'column' }}>
      {!isThumbnail && !hideTitle &&
        <ChartTitle
          title="Profil de mérite - sondage unique"
          subtitle1={`Comparaison du profil de mérite des différents candidats pour un sondage donné au scrutin majoritaire`}
        />}
      <Box sx={{ width: 1, flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {
          !isThumbnail &&
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "start", gap: 2, mb: 2 }}>
            <Typography color="text.secondary">Date du sondage :</Typography>
            {controlMode === 'select' ? (
              <Select
                size="small"
                labelId="poll-select-label"
                id="poll-select"
                value={pollIndex}
                onChange={(e) => setPollIndex(Number(e.target.value))}
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
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  disabled={pollIndex >= pt1Dates.length - 1}
                  onClick={() => setPollIndex(prev => Math.min(prev + 1, pt1Dates.length - 1))}
                >
                  Précédent
                </Button>
                <Typography sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', px: 2 }}>
                  {pt1Dates[pollIndex] ? new Date(pt1Dates[pollIndex].date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  }) : '-'}
                </Typography>
                <Button
                  variant="outlined"
                  disabled={pollIndex <= 0}
                  onClick={() => setPollIndex(prev => Math.max(prev - 1, 0))}
                >
                  Suivant
                </Button>
              </Box>
            )}
          </Box>
        }
        <Box sx={{ flex: height ? 'none' : 1, height: height || '100%', minHeight: 0 }}>
          <Chart option={meritChartOption} />
        </Box>
      </Box>
    </Box>
  </>)
}
