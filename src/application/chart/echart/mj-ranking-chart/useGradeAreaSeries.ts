import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { graphColor } from '../../../../colors';
import { selectGradRankLimitsForEchart } from '../../../../store/jm-slice/jm-selector';

export const useGradeAreaSeries = () => {
  const gradeRankLimits = useSelector(selectGradRankLimitsForEchart);

  const gradeAreaSeries = useMemo(() => {
    return gradeRankLimits?.map((gradeSeries: any) => ({
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
    })) || [];
  }, [gradeRankLimits]);

  return gradeAreaSeries;
};
