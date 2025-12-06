import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { graphColor } from '../../../../colors';
import { selectCandidateApprovalRatesForECharts } from '../../../../store/approval-slice/approval-selector';

export const useCandidateApprovalEvolutionSeries = (selectedCandidates: Set<string>, isThumbnail: boolean) => {
    const candidateApprovalRates = useSelector(selectCandidateApprovalRatesForECharts);

    const candidateApprovalSeries = useMemo(() => {
        const hasSelection = selectedCandidates && selectedCandidates.size > 0;

        return candidateApprovalRates?.map(rate => {
            const isSelected = selectedCandidates?.has(rate.name) ?? false;
            const shouldGray = hasSelection && !isSelected;

            return {
                name: rate.name,
                data: rate.data,
                type: 'line' as const,
                smooth: 0.3,
                symbolSize: isSelected ? 6 : 0,
                showSymbol: isSelected,
                triggerLineEvent: true,
                animation: !isThumbnail,
                animationDuration: 2000,
                animationEasing: 'cubicOut' as const,
                lineStyle: {
                    color: shouldGray ? '#cccccc' : graphColor.candidateColor[rate.name],
                    width: isSelected ? 4 : 1.5
                },
                itemStyle: {
                    color: shouldGray ? '#cccccc' : graphColor.candidateColor[rate.name]
                },
                emphasis: {
                    lineStyle: {
                        width: 4,
                        color: graphColor.candidateColor[rate.name],
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowOffsetY: 3
                    }
                },
                endLabel: {
                    show: true,
                    formatter: (params: any) => {
                        const approval = Math.round(params.value[1]);
                        return `${approval}% ${params.seriesName}`;
                    },
                    distance: 15,
                    color: isSelected ? graphColor.candidateColor[rate.name] : '#666666',
                }
            };
        }) || [];
    }, [candidateApprovalRates, selectedCandidates, isThumbnail]);

    return candidateApprovalSeries;
};
