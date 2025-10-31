export const rankingChartConfig = {
    tooltip: {
        trigger: 'item' as const,
        formatter: (params: any) => {
            if (Array.isArray(params)) return '';
            const data = params.data as [string | number | Date, number]
            const date = new Date(data[0]).toLocaleDateString('fr-FR')
            const rank = Math.round(data[1])
            const rankText = rank === 1 ? '1er' : `${rank}ème`
            const marker = typeof params.marker === 'string' ? params.marker : (params.marker?.content ?? '')
            const seriesName = String(params.seriesName ?? '')
            return `${marker}${seriesName}<br/>${date} : ${rankText}`
        }
    },
    legend: {
        data: [
            "ni satisfait ni insatisfait",
            "plutôt insatisfait",
            "très insatisfait"
        ],
        bottom: 0,
        orient: "horizontal" as const
    },
    grid: {
        left: "3%",
        right: 145,
        bottom: 50,
        top: 60,
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
        inverse: true,
        min: 0.5,
        max: 27,
        interval: 1,
        axisLabel: {
            show: false
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