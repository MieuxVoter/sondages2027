import { Box } from '@mui/material';
import type { EChartsOption } from 'echarts';
import React from 'react';
import { useSelector } from 'react-redux';
import echartsRanking from '../../../../data/echarts_ranking.json';
import { selectCandidateRankingsForECharts } from '../../../../store/jm-slice/jm-selector';
import Chart from '../../../share/Chart';
import { rankingChartConfig } from './rankingChartConfig';

const rankingChartOption: EChartsOption = {
  ...(echartsRanking as EChartsOption),
  ...rankingChartConfig,

}

export const MjRankingChart: React.FC = () => {
  const candidateRankings = useSelector(selectCandidateRankingsForECharts);

  return (
    <Box sx={{ width: 1, height: 1 }}>
      <Chart option={rankingChartOption} />
      <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper' }}>
        <pre>{JSON.stringify(candidateRankings, null, 2)}</pre>
      </Box>
    </Box>
  )
}

// "title": {
//   "text": "Classement des candidats à l'élection présidentielle 2027",
//   "subtext": "source: IPSOS, commanditaire: La Tribune Dimanche",
//   "left": "center",
//   "textStyle": {
//     "fontWeight": "bold"
//   }
// },