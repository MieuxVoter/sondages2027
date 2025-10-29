import { Box } from "@mui/material"
import Chart from "../../share/Chart"
import echartsMerit from '../../../data/echarts_ipsos-2015-1.json';
import type { EChartsOption } from "echarts";

const meritChartOption: EChartsOption = {
  ...(echartsMerit as EChartsOption),
}

export const JmMeritChart: React.FC = () => {
  return (
    <Box sx={{ width: 1, height: 1, }}>
      <Chart option={meritChartOption} />
    </Box>
  )
}