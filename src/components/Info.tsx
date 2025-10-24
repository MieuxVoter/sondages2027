import { Box, Card, CardContent, Typography, Button } from '@mui/material'
import { Link, Outlet } from '@tanstack/react-router'
import Plot from 'react-plotly.js'
import rankingPlotData from '../data/ranking-plot-all.json'

export function Info() {
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