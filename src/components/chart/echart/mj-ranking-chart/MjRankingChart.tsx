import { Box } from '@mui/material';
import type { EChartsOption } from 'echarts';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLastPt1Date } from '../../../../store/jm-slice/jm-selector';
import { BorderLayout } from '../../../share/layout/BorderLayout';
import { rankingChartConfig } from './rankingChartConfig';
import { useCandidateRankingSeries } from './useCandidateRankingSeries';
import { useGradeAreaSeries } from './useGradeAreaSeries';
import Chart from '../../../share/Chart';
import { ChartTitle } from '../../../share/ChartTitle';

interface MjRankingChartProps {
  isThumbnail?: boolean;
}

export const MjRankingChart: React.FC<MjRankingChartProps> = ({ isThumbnail = false }) => {
  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(new Set());

  const candidateRankingsSeries = useCandidateRankingSeries(selectedCandidates);
  const gradeAreaSeries = useGradeAreaSeries();
  const lastPollDate = useSelector(selectLastPt1Date);

 //const series = [...gradeAreaSeries, ...candidateRankingsSeries];
 const series = [...candidateRankingsSeries];

  const handleChartClick = (params: any) => {
    if (params.componentType === 'series' && params.seriesType === 'line') {
      const candidateName = params.seriesName;
      setSelectedCandidates(prev => {
        const newSet = new Set(prev);
        if (newSet.has(candidateName)) {
          newSet.delete(candidateName);
        } else {
          newSet.add(candidateName);
        }
        return newSet;
      });
    }
  }

  const chartEvents = {
    click: handleChartClick
  };

  const rankingChartOption: EChartsOption = {
    ...rankingChartConfig,
    legend: isThumbnail ? { show: false } : rankingChartConfig.legend,
    yAxis: {...rankingChartConfig.yAxis, max: candidateRankingsSeries.length},
    series
  }

  if (!candidateRankingsSeries.length) {
    return <Box sx={{ p: 2 }}>Chargement des données...</Box>;
  }


  return (
    <Box sx={{ width: 1, height: 1 }}>
      <BorderLayout
        north={
          <>
            {!isThumbnail &&
            <ChartTitle
              title="Classement des candidats à l'éléction présidentiel 2027"
              subtitle1={`source : IPSOS, commanditaire La Tribune Dimanche, dernier sondage: 
                ${lastPollDate ? new Date(lastPollDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}`}
              subtitle2="scrutin : Jugement majoritaire "/>
            }
          </>
        }
        center={<Chart option={rankingChartOption} onEvents={chartEvents} />}
      />
    </Box>
  )
}
