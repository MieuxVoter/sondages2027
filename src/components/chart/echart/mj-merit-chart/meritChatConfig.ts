import type { EChartsOption } from 'echarts';

export const mjMeritChartConfig: EChartsOption = {
  tooltip: {
    trigger: 'item' as const,
    formatter: (params: any) => {
      if (Array.isArray(params)) return '';
      const candidateName = params.name;
      const gradeName = params.seriesName;
      const value = params.value;
      return `${candidateName}<br/>${gradeName}: ${value}%`;
    }
  },
  legend: {
    data: [
      'très satisfait',
      'plutôt satisfait',
      'ni satisfait ni insatisfait',
      'plutôt insatisfait',
      'très insatisfait'
    ],
    bottom: 0,
    orient: 'horizontal' as const
  },
  grid: {
    left: '4%',
    right: '4%',
    bottom: '8%',
    top: '8%',
    containLabel: true
  },
  xAxis: {
    type: 'value' as const,
    min: 0,
    max: 100,
    axisLabel: {
      formatter: '{value}%'
    },
    splitLine: {
      show: true
    }
  },
  yAxis: {
    type: 'category' as const,
    inverse: true,
    axisLabel: {
      fontSize: 12
    }
  },
}