import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { graphColor } from '../../../../colors';
import { selectCandidateApprovalRankingsForECharts } from '../../../../store/approval-slice/approval-selector';

export const useCandidateApprovalRankingSeries = (selectedCandidates: Set<string>, isThumbnail: boolean) => {
  const candidateRankings = useSelector(selectCandidateApprovalRankingsForECharts);

  const candidateRankingsSeries = useMemo(() => {
    const hasSelection = selectedCandidates && selectedCandidates.size > 0;

    return candidateRankings?.map(ranking => {
      const isSelected = selectedCandidates?.has(ranking.name) ?? false;
      const shouldGray = hasSelection && !isSelected;

      return {
        name: ranking.name,
        data: ranking.data,
        type: 'line' as const,
        smooth: 0.3,
        symbolSize: isSelected ? 6 : 0,
        showSymbol: isSelected,
        triggerLineEvent: true,
        animation: !isThumbnail,
        animationDuration: 2000,
        animationEasing: 'cubicOut' as const,
        lineStyle: {
          color: shouldGray ? '#cccccc' : graphColor.candidateColor[ranking.name],
          width: isSelected ? 4 : 1.5
        },
        itemStyle: {
          color: shouldGray ? '#cccccc' : graphColor.candidateColor[ranking.name]
        },
        emphasis: {
          lineStyle: {
            width: 4,
            color: graphColor.candidateColor[ranking.name],
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowOffsetY: 3
          }
        },
        endLabel: {
          show: true,
          formatter: (params: any) => {
            const rank = Math.round(params.value[1]);
            const rankText = rank === 1 ? '1er ' : `${rank}e`.padEnd(4, ' ');
            return `${rankText} ${params.seriesName}`;
          },
          distance: 15,
          color: isSelected ? graphColor.candidateColor[ranking.name]: '#666666',
        }
      };
    }) || [];
  }, [candidateRankings, selectedCandidates]);

  return candidateRankingsSeries;
};
