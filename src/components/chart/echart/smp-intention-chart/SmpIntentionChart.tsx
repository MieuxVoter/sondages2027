import { Box, FormControlLabel, Switch } from '@mui/material';
import type { EChartsOption } from 'echarts';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Chart from '../../../share/Chart';
import {
    selectSmpLineSeries,
    selectSmpAreaSeries,
    selectSmpScatterSeries,
    selectSmpLabelSeries,
    selectLastSmpDate
} from '../../../../store/smp-slice/smp-selector';
import { smpIntentionChartConfig } from './smpIntentionChartConfig';

interface SmpIntentionChartProps {
    isThumbnail?: boolean;
    height?: number | string;
    hideTitle?: boolean;
    showRawPolls?: boolean;
    showConfidenceArea?: boolean;
}

export const SmpIntentionChart: React.FC<SmpIntentionChartProps> = ({
    isThumbnail = false,
    hideTitle = false,
    showRawPolls: initialShowRawPolls = false,
    showConfidenceArea: initialShowConfidenceArea = true,
}) => {
    const [showRawPolls, setShowRawPolls] = useState(initialShowRawPolls);
    const [showConfidenceArea, setShowConfidenceArea] = useState(initialShowConfidenceArea);

    const lineSeries = useSelector(selectSmpLineSeries);
    const areaSeries = useSelector(selectSmpAreaSeries);
    const scatterSeries = useSelector(selectSmpScatterSeries);
    const labelSeries = useSelector(selectSmpLabelSeries);
    const lastPollDate = useSelector(selectLastSmpDate);

    // Build series array
    const series: any[] = [];

    // Add confidence areas first (behind lines)
    if (showConfidenceArea) {
        series.push(...areaSeries);
    }

    // Add main lines
    series.push(...lineSeries);

    // Add labels
    series.push(...labelSeries);

    // Add raw poll points
    if (showRawPolls) {
        series.push(...scatterSeries);
    }

    // Add "Today" vertical line marker
    const todayDate = new Date().toISOString().split('T')[0];

    const chartOption: EChartsOption = {
        ...smpIntentionChartConfig,
        title: hideTitle ? undefined : {
            ...smpIntentionChartConfig.title,
            subtext: lastPollDate
                ? `Dernier sondage: ${new Date(lastPollDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}`
                : smpIntentionChartConfig.title.subtext
        },
        series: [
            ...series,
            // Today marker line
            {
                type: 'line',
                data: [],
                markLine: {
                    data: [{ xAxis: todayDate }],
                    lineStyle: { type: 'dashed', color: '#666' },
                    label: {
                        formatter: "Aujourd'hui",
                        position: 'start'
                    },
                    silent: true
                }
            }
        ]
    };

    if (!lineSeries.length) {
        return <Box sx={{ p: 2 }}>Chargement des données...</Box>;
    }

    return (
        <Box sx={{ width: 1, height: 1, display: 'flex', flexDirection: 'column' }}>
            {!isThumbnail && (
                <Box sx={{ display: 'flex', gap: 2, mb: 1, justifyContent: 'flex-end' }}>
                    <FormControlLabel
                        control={
                            <Switch
                                size="small"
                                checked={showConfidenceArea}
                                onChange={(e) => setShowConfidenceArea(e.target.checked)}
                            />
                        }
                        label="Intervalle de confiance"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                size="small"
                                checked={showRawPolls}
                                onChange={(e) => setShowRawPolls(e.target.checked)}
                            />
                        }
                        label="Sondages bruts"
                    />
                </Box>
            )}
            <Box sx={{ flex: 1, minHeight: 0 }}>
                <Chart option={chartOption} />
            </Box>
        </Box>
    );
};
