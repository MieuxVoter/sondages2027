import { Box, Button } from '@mui/material';
import type { EChartsOption } from 'echarts';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Chart from '../../../share/Chart';
import { selectCandidateOrderedByLatestApprovalRank } from '../../../../store/approval-slice/approval-selector';
import { approvalEvolutionChartConfig } from './approvalEvolutionChartConfig';
import { useCandidateApprovalEvolutionSeries } from './useCandidateApprovalEvolutionSeries';

interface ApprovalEvolutionChartProps {
    isThumbnail?: boolean;
}

export const ApprovalEvolutionChart: React.FC<ApprovalEvolutionChartProps> = ({ isThumbnail = false }) => {
    const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(new Set());

    const candidateApprovalSeries = useCandidateApprovalEvolutionSeries(selectedCandidates, isThumbnail);
    const latestApprovals = useSelector(selectCandidateOrderedByLatestApprovalRank);

    // Calculate Y-axis max (round up to nearest 10 from the best approval rate)
    const maxApproval = latestApprovals.length > 0
        ? Math.max(...latestApprovals.map(c => c.approval))
        : 100;
    const yAxisMax = Math.ceil(maxApproval / 10) * 10;

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
        yAxis: {
            ...approvalEvolutionChartConfig.yAxis,
            max: yAxisMax
        },
        legend: { show: false },
        series
    }

    if (!candidateApprovalSeries.length) {
        return <Box sx={{ p: 2 }}>Chargement des données...</Box>;
    }

    return (
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
                        bottom: 100,
                        left: 100,
                        zIndex: 1000
                    }}
                >
                    Réinitialiser
                </Button>
            )}
        </Box>
    )
}
