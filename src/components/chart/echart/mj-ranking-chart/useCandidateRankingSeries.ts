import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { graphColor } from '../../../../colors';
import { selectCandidateRankingsForECharts } from '../../../../store/jm-slice/jm-selector';

export const useCandidateRankingSeries = () => {
  const candidateRankings = useSelector(selectCandidateRankingsForECharts);

  const candidateRankingsSeries = useMemo(() => {
    return candidateRankings?.map(ranking => ({
      name: ranking.name,
      data: ranking.data,
      type: 'line' as const,
      smooth: 0.3,
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
  }, [candidateRankings]);

  return candidateRankingsSeries;
};
