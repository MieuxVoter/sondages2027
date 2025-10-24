import { Box } from '@mui/material'
import type { EChartsOption } from 'echarts';
import React from 'react';
import echartsRanking from '../../data/echarts_ranking.json'
import { useIsMobile } from '../../hooks/useIsMobile'
import Chart from '../Chart';

const rankingChartOption: EChartsOption = {
    ...(echartsRanking as EChartsOption),
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const date = new Date(params.data[0]).toLocaleDateString('fr-FR')
        const rank = Math.round(params.data[1])
        const rankText = rank === 1 ? '1er' : `${rank}ème`
        return `${params.marker}${params.seriesName}<br/>${date} : ${rankText}`
      }
    }
  }

export const JmRankingChart : React.FC = () => {
    const isMobile = useIsMobile()

    return (
        <Box sx={{ width: 1, height: 1,
            transform: isMobile ? 'scale(0.8)' : 'scale(1)',
            transformOrigin: 'top left'
        }}>
          <Chart option={rankingChartOption} />
        </Box>
    )
}