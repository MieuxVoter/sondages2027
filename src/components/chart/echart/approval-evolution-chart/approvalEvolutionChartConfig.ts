export const approvalEvolutionChartConfig = {
    tooltip: {
        trigger: 'item' as const,
        formatter: (params: any) => {
            if (Array.isArray(params)) return '';
            const data = params.data as [string | number | Date, number]
            const date = new Date(data[0]).toLocaleDateString('fr-FR')
            const approval = Math.round(data[1])
            const marker = typeof params.marker === 'string' ? params.marker : (params.marker?.content ?? '')
            const seriesName = String(params.seriesName ?? '')
            return `${marker}${seriesName}<br/>${date} : ${approval}%`
        }
    },
    grid: {
        left: "3%",
        right: 145,
        bottom: 50,
        top: 50,
        containLabel: true
    },
    xAxis: {
        type: "time" as const,
        axisLabel: {
            formatter: "{MM}/{yyyy}"
        }
    },
    yAxis: {
        type: "value" as const,
        min: 0,
        max: 100,
        interval: 10,
        axisLabel: {
            formatter: '{value}%'
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: "#e0e0e0",
                type: "dashed" as const
            }
        }
    }
};
