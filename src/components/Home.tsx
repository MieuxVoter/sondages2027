import Chart from './Chart'
import type { EChartsOption } from 'echarts'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/material'
import echartsConfig from '../data/echarts_ipsos-2015-1.json'
import rankingConfig from '../data/echarts_ranking.json'

export function Home() {
  const theme = useTheme()

  const satisfactionColors = [
    theme.palette.success.dark,      // très satisfait - vert foncé
    theme.palette.success.main,      // plutôt satisfait - vert
    theme.palette.warning.main,                      // ni satisfait ni insatisfait - jaune
    theme.palette.warning.dark,      // plutôt insatisfait - orange
    theme.palette.error.main,        // très insatisfait - rouge
  ]

  const barChartOption: EChartsOption = {
    ...echartsConfig,
    grid: {
      ...echartsConfig.grid,
      top: '10%',
      bottom: '8%'
    },
    legend: {
      ...echartsConfig.legend,
      bottom: '2%'
    },
    series: [
      ...echartsConfig.series.map((series: any, index: number) => {
        const { itemStyle, ...seriesWithoutItemStyle } = series
        return {
          ...seriesWithoutItemStyle,
          itemStyle: {
            color: satisfactionColors[index]
          }
        }
      }),
      {
        type: 'line',
        markLine: {
          data: [{
            xAxis: 50,
            lineStyle: {
              color: '#000',
              width: 2,
              type: 'solid'
            },
            label: {
              show: false
            }
          }],
          symbol: 'none'
        },
        data: []
      }
    ]
  } as unknown as EChartsOption

  const rankingChartOption: EChartsOption = {
    ...rankingConfig,
    grid: {
      ...rankingConfig.grid,
      right: '20%'  // Plus d'espace à droite pour les labels
    },
    series: rankingConfig.series.map((series: any) => {
      // Ajouter des labels en fin de ligne pour chaque candidat
      if (series.name && series.name !== 'ni satisfait ni insatisfait' &&
          series.name !== 'plutôt insatisfait' && series.name !== 'très insatisfait') {

        const rankings: { [key: string]: string } = {
          'Edouard Philippe': '6e',
          'Jordan Bardella': '15e',
          'Marine Le Pen': '18e',
          'Raphaël Glucksmann': '5e',
          'François Hollande': '22e',
          'François Ruffin': '7e',
          'Fabien Roussel': '10e',
          'Gérald Darmanin': '3e',
          'Bruno Le Maire': '20e',
          'François Bayrou': '23e',
          'Xavier Bertrand': '13e',
          'Olivier Faure': '8e',
          'Bernard Cazeneuve': '4e',
          'Marine Tondelier': '17e',
          'Laurent Wauquiez': '21e',
          'Yaël Braun-Pivet': '12e',
          'Jean-Luc Mélenchon': '26e',
          'Eric Zemmour': '25e',
          'Michel Barnier': '11e',
          'Gabriel Attal': '9e',
          'Bruno Retailleau': '1er',
          'David Lisnard': '2e',
          'Jean Castex': '16e',
          'Marion Maréchal': '24e',
          'Eric Ciotti': '19e',
          'Dominique de Villepin': '14e'
        }

        return {
          ...series,
          endLabel: {
            show: true,
            formatter: `${series.name} ${rankings[series.name] || ''}`,
            color: series.lineStyle?.color || '#000',
            fontSize: 12,
            fontFamily: 'Arial'
          }
        }
      }
      return series
    })
  } as EChartsOption

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, p: 2, width: '100%' }}>
      <Box sx={{ height: '500px' }}>
        <Chart option={barChartOption} />
      </Box>
      <Box sx={{ height: '500px' }}>
        <Chart option={rankingChartOption} />
      </Box>
    </Box>
  )
}