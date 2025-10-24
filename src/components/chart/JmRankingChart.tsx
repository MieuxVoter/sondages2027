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
      formatter: (params) => {
        if (Array.isArray(params)) return '';
        const data = params.data as [string | number | Date, number]
        const date = new Date(data[0]).toLocaleDateString('fr-FR')
        const rank = Math.round(data[1])
        const rankText = rank === 1 ? '1er' : `${rank}ème`
        const marker = typeof params.marker === 'string' ? params.marker : (params.marker?.content ?? '')
        const seriesName = String(params.seriesName ?? '')
        return `${marker}${seriesName}<br/>${date} : ${rankText}`
      }
    }
  }

export const JmRankingChart : React.FC = () => {
    // const isMobile = useIsMobile()
    const isMobile = true; 

    return (
        <Box sx={{ width: 1, height: 1,
            transform: isMobile ? 'scale(0.5)' : 'scale(1)',
            transformOrigin: 'top left'
        }}>
          <Chart option={rankingChartOption} />
        </Box>
    )
}