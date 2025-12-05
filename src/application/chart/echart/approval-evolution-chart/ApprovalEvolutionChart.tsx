import { Box, Button } from '@mui/material';
import type { EChartsOption } from 'echarts';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Chart from '../../../../share/component/Chart';
import { ChartTitle } from '../../../../share/component/ChartTitle';
import { BorderLayout } from '../../../../share/component/layout/BorderLayout';
import { selectLastApprovalDate } from '../../../../store/approval-slice/approval-selector';
import { approvalEvolutionChartConfig } from './approvalEvolutionChartConfig';
import { useCandidateApprovalEvolutionSeries } from './useCandidateApprovalEvolutionSeries';

interface ApprovalEvolutionChartProps {
  isThumbnail?: boolean;
}

export const ApprovalEvolutionChart: React.FC<ApprovalEvolutionChartProps> = ({ isThumbnail = false }) => {
  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(new Set());

  const candidateApprovalSeries = useCandidateApprovalEvolutionSeries(selectedCandidates, isThumbnail);
  const lastPollDate = useSelector(selectLastApprovalDate);

  const series = [...candidateApprovalSeries];

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

  const evolutionChartOption: EChartsOption = {
    ...approvalEvolutionChartConfig,
    legend: { show: false },
    series
  }

  if (!candidateApprovalSeries.length) {
    return <Box sx={{ p: 2 }}>Chargement des données...</Box>;
  }


  return (
    <Box sx={{ width: 1, height: 1 }}>
      <BorderLayout
        north={
          <>
            {!isThumbnail &&
              <ChartTitle
                title="Évolution du taux d'approbation des candidats - Vote par approbation"
                subtitle1={`source : IPSOS, commanditaire La Tribune Dimanche, dernier sondage:
                ${lastPollDate ? new Date(lastPollDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}`}
                subtitle2="scrutin : Vote par approbation" />
            }
          </>
        }
        center={
          <Box sx={{ width: 1, height: 1, position: 'relative' }}>
            <Chart option={evolutionChartOption} onEvents={chartEvents} />
            {selectedCandidates.size > 0 && (
              <Button
                type="button"
                variant="contained"
                size="small"
                onClick={() => setSelectedCandidates(new Set())}
                sx={{
                  position: 'absolute',
                  bottom: 150,
                  left: 100,
                  zIndex: 1000
                }}
              >
                Réinitialiser
              </Button>
            )}
          </Box>
        }
      />
    </Box>
  )
}
