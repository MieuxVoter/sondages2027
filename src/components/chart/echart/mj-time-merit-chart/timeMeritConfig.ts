import type { EChartsOption } from 'echarts';

export const timeMeritConfig: EChartsOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      "type": "cross"
    }
  },
  legend: {
    data: [
      "très satisfait",
      "plutôt satisfait",
      "ni satisfait ni insatisfait",
      "plutôt insatisfait",
      "très insatisfait"
    ],
    bottom: 0,
    orient: "horizontal"
  },
  grid: {
    left: "4%",
    right: "4%",
    bottom: "8%",
    top: "8%",
    containLabel: true
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
  },
  yAxis: {
    type: "value",
    min: 0,
    max: 100,
    axisLabel: {
      formatter: "{value}%"
    },
    splitLine: {
      show: true
    }
  },
}
