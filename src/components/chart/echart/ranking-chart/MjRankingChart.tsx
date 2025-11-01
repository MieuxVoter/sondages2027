import { Box } from '@mui/material';
import type { EChartsOption } from 'echarts';
import React from 'react';
import { useSelector } from 'react-redux';
import { graphColor } from '../../../../colors';
import { selectCandidateRankingsForECharts, selectGradRankLimitsForEchart, } from '../../../../store/jm-slice/jm-selector';
import Chart from '../../../share/Chart';
import { rankingChartConfig } from './rankingChartConfig';

export const MjRankingChart: React.FC = () => {

  const candidateRankings = useSelector(selectCandidateRankingsForECharts);
  // Ajouter type: 'line' et endLabel à chaque série
  const candidateRankingsSeries = candidateRankings?.map(ranking => ({
    name: ranking.name,
    data: ranking.data,
    type: 'line' as const,
    lineStyle: {
      color: graphColor.candidateColor[ranking.name],
      width: 1.5
    },
    itemStyle: {
      color: graphColor.candidateColor[ranking.name]
    },
    endLabel: {
      show: true,
      formatter: (params: any) => {
        const rank = Math.round(params.value[1]);
        const rankText = rank === 1 ? '1er ' : `${rank}e`.padEnd(4, ' ');
        return `${rankText} ${params.seriesName}`;
      },
      distance: 15,
      color: graphColor.candidateColor[ranking.name],

    }
  })) || [];

  const gradRankLimits = useSelector(selectGradRankLimitsForEchart);

  const gradAreaSeries = gradRankLimits?.map((gradeSeries: any) => {
    return {
      name: gradeSeries.name,
      type: 'line' as const,
      data: gradeSeries.data,
      stack: gradeSeries.name,
      areaStyle: { color: graphColor.rankingFiveGradeScale[gradeSeries.gradeRank - 1] },
      itemStyle: { color: graphColor.rankingFiveGradeScale[gradeSeries.gradeRank - 1] },
      lineStyle: {
        width: 0,
        color: "transparent"
      },
      symbol: "none",
      smooth: false,
    }
  }) || [];

  const series = [...gradAreaSeries, ...candidateRankingsSeries,];

  const rankingChartOption: EChartsOption = {
    ...rankingChartConfig,
    series
  }

  if (!candidateRankings) {
    return <Box sx={{ p: 2 }}>Chargement des données...</Box>;
  }

  return (
    <Box sx={{ width: 1, height: 1 }}>
      <Chart option={rankingChartOption} />
    </Box>
  )
}
