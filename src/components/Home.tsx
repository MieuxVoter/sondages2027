import { Avatar, Box, Card, CardContent, CardHeader, Paper } from '@mui/material'
import { red } from '@mui/material/colors'
import Plot from 'react-plotly.js'
import rankingPlotData from '../data/ranking-plot-all.json'
import { JmRankingChart } from './chart/JmRankingChart'
import { useIsMobile } from '../hooks/useIsMobile'
import { MobHome } from './mobile/MobHome'
import { WebHome } from './web/WebHome'

export function Home() {
  const isMobile = useIsMobile()

  return isMobile ? <MobHome /> : <WebHome />
}
