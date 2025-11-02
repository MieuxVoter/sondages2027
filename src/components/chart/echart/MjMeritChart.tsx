import { Box, useTheme } from "@mui/material";
import type { EChartsOption } from "echarts";
import echartsMerit from '../../../data/echarts_ipsos-2015-1.json';
import Chart from "../../share/Chart";

interface MjMeritChartProps {
  isThumbnail?: boolean;
}

export const MjMeritChart: React.FC<MjMeritChartProps> = ({ 
  // isThumbnail = false 
}) => {
  const theme = useTheme();

  const meritChartOption: EChartsOption = {
    ...(echartsMerit as EChartsOption),
    series: (echartsMerit.series || []).map((serie: any, index: number) => {
      // Ajouter le markLine seulement à la première série
      if (index === 0) {
        return {
          ...serie,
          markLine: {
            symbol: 'none',
            data: [{
              xAxis: 50,
              lineStyle: {
                color: theme.palette.primary.main,
                width: 2,
                type: 'solid'
              },
              label: {
                show: true,
                position: 'start',
                formatter: '50%'
              }
            }],
            silent: true,
          }
        }
      }
      return serie;
    }) as any
  }

  return (
    <Box sx={{ width: 1, height: 1, }}>
      <Chart option={meritChartOption} />
    </Box>
  )
}
