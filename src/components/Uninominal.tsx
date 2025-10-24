import { Box } from '@mui/material'
import Plot from 'react-plotly.js'
import rankingPlotData from '../data/plotly_ranking.json'

export function Uninominal() {
  return (
      <Box sx={{ height: '600px', width:1 }}>
                <Plot
                    data={rankingPlotData.data as unknown as Plotly.Data[]}
                    layout={rankingPlotData.layout as unknown as Partial<Plotly.Layout>}
                    style={{ width: '100%', height: '100%' }}
                    useResizeHandler={true}
                    config={{ responsive: true }}
                />
            </Box>
  )
}