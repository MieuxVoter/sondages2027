export const approvalRateChartConfig = {
    tooltip: {
        trigger: 'axis' as const,
        axisPointer: {
            type: 'shadow' as const
        },
        formatter: (params: any) => {
            if (Array.isArray(params) && params.length > 0) {
                const param = params[0];
                const marker = typeof param.marker === 'string' ? param.marker : (param.marker?.content ?? '');
                return `${marker}${param.name}<br/>Taux d'approbation : ${param.value}%`;
            }
            return '';
        }
    },
    grid: {
        left: "15%",
        right: "10%",
        bottom: 50,
        top: 50,
        containLabel: true
    },
    xAxis: {
        type: "value" as const,
        min: 0,
        max: 100,
        axisLabel: {
            formatter: '{value}%'
        }
    },
    yAxis: {
        type: "category" as const,
        data: [],
        axisLabel: {
            fontSize: 12
        }
    },
    legend: {
        show: false
    }
};
