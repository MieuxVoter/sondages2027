import Chart from './Chart'
import type { EChartsOption } from 'echarts'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/material'
import Plot from 'react-plotly.js'
import rankingPlotData from '../data/ranking-plot-all.json'
import echartsRanking from '../data/echarts_ranking.json'

export function Home() {
  const theme = useTheme()

  const satisfactionColors = [
    theme.palette.success.dark,      // très satisfait - vert foncé
    theme.palette.success.main,      // plutôt satisfait - vert
    theme.palette.warning.main,                      // ni satisfait ni insatisfait - jaune
    theme.palette.warning.dark,      // plutôt insatisfait - orange
    theme.palette.error.main,        // très insatisfait - rouge
  ]

  const rankingChartOption: EChartsOption = echartsRanking as EChartsOption

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, p: 2, width: '100%' }}>
      <Box sx={{ height: '800px' }}>
        <Chart option={rankingChartOption} />
      </Box>
      <Box sx={{ height: '800px' }}>
        <Plot
          data={rankingPlotData.data as unknown as Plotly.Data[]}
          layout={rankingPlotData.layout as unknown as Partial<Plotly.Layout>}
          style={{ width: '100%', height: '100%' }}
          useResizeHandler={true}
          config={{ responsive: true }}
        />
      </Box>
    </Box>
  )
}