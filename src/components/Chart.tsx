import React from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';

interface ChartProps {
  option: EChartsOption;
  style?: React.CSSProperties;
  className?: string;
  theme?: string;
  onEvents?: Record<string, (params: unknown) => void>;
}

const DEFAULT_STYLE: React.CSSProperties = { height: '100%', width: '100%' };

const Chart: React.FC<ChartProps> = ({
  option,
  style = DEFAULT_STYLE,
  className,
  theme,
  onEvents
}) => {
  const optionWithNoAnimation = {
    ...option,
    animation: false
  };

  return (
    <ReactECharts
      option={optionWithNoAnimation}
      style={style}
      className={className}
      theme={theme}
      onEvents={onEvents}
      opts={{ renderer: 'canvas' }}
    />
  );
};

export default Chart;