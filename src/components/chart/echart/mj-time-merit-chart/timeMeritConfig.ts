import type { EChartsOption } from 'echarts';

export const timeMeritConfig: EChartsOption = {
//   "title": {
//     "text": "Evolution des mentions au jugement majoritaire\npour le candidat François Ruffin",
//     "subtext": "source: IPSOS, commanditaire: La Tribune Dimanche, dernier sondage: 2025-09-12",
//     "left": "center",
//     "textStyle": {
//       "fontWeight": "bold"
//     }
//   },
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
    left: "3%",
    right: "4%",
    bottom: "15%",
    top: "20%",
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
