export const smpIntentionChartConfig = {
    title: {
        text: "Élection présidentielle 2027",
        subtext: "Intentions de vote agrégées (tous scénarios confondus)",
        left: 'center',
    },
    tooltip: {
        trigger: 'item' as const,
        formatter: (params: any) => {
            if (Array.isArray(params)) return '';
            const value = params.value;
            if (!value || value.length < 2 || value[1] === null) return '';

            const date = new Date(value[0]).toLocaleDateString('fr-FR');
            const intention = typeof value[1] === 'number' ? value[1].toFixed(1) : value[1];

            let tooltip = `<strong>${params.seriesName}</strong><br/>`;
            tooltip += `${date}: ${intention}%`;

            if (params.data?.institut) {
                tooltip += `<br/>Institut: ${params.data.institut}`;
            }
            if (params.data?.commanditaire) {
                tooltip += `<br/>Commanditaire: ${params.data.commanditaire}`;
            }

            return tooltip;
        }
    },
    legend: { show: false },
    grid: {
        left: "3%",
        right: 180, // Space for candidate labels
        bottom: 50,
        top: 80,
        containLabel: true
    },
    xAxis: {
        type: "time" as const,
        axisLabel: {
            formatter: "{MMM} {yyyy}"
        }
    },
    yAxis: {
        type: "value" as const,
        name: 'Intention de vote (%)',
        min: 0,
        max: 40,
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
