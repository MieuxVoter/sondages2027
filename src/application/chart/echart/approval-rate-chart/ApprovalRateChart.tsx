import { Box, MenuItem, Select, Typography } from "@mui/material";
import type { EChartsOption } from "echarts";
import { useState } from "react";
import { useSelector } from "react-redux";
import { graphColor } from "../../../../colors";
import Chart from "../../../../share/component/Chart";
import { ChartTitle } from "../../../../share/component/ChartTitle";
import { BorderLayout } from "../../../../share/component/layout/BorderLayout";
import { selectApprovalDates, selectCandidateApprovalByPollIndex } from "../../../../store/approval-slice/approval-selector";
import type { RootState } from "../../../../store/store";
import { approvalRateChartConfig } from "./approvalRateChartConfig";

interface ApprovalRateChartProps {
  isThumbnail?: boolean;
}

export const ApprovalRateChart: React.FC<ApprovalRateChartProps> = ({
  isThumbnail = false
}) => {
  const [pollIndex, setPollIndex] = useState(0);

  const approvalDates = useSelector(selectApprovalDates);
  const candidateApprovals = useSelector((state: RootState) => selectCandidateApprovalByPollIndex(state, pollIndex));

  const approvalRateChartOption: EChartsOption = {
    ...approvalRateChartConfig,
    yAxis: {
      ...approvalRateChartConfig.yAxis,
      data: candidateApprovals?.map(ca => ca.name) || [],
    },
    series: [{
      type: 'bar' as const,
      data: candidateApprovals?.map((ca, index) => ({
        value: ca.approval,
        itemStyle: {
          color: graphColor.candidateColor[ca.name] || graphColor.primary
        }
      })) || [],
      label: {
        show: !isThumbnail,
        position: 'right' as const,
        formatter: '{c}%'
      }
    }]
  }

  return (
    <BorderLayout
      north={!isThumbnail &&
        <ChartTitle
          title="Taux d'approbation - sondage unique"
          subtitle1={`Comparaison du taux d'approbation des différents candidats pour un sondage donné au vote par approbation`}
        />}
      center={
        <Box sx={{ width: 1, height: 1, display: 'flex', flexDirection: 'column' }}>
          {
            !isThumbnail &&
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "start", gap: 2 }}>
              <Typography color="text.secondary">Date du sondage :</Typography>
              <Select
                size="small"
                labelId="poll-select-label"
                id="poll-select"
                value={pollIndex}
                onChange={(e) => setPollIndex(Number(e.target.value))}
              >
                {approvalDates.map((dateObj) => (
                  <MenuItem key={dateObj.index} value={dateObj.index}>
                    {new Date(dateObj.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          }
          <Box sx={{ flex: 1 }}>
            <Chart option={approvalRateChartOption} />
          </Box>
        </Box>
      }
    >
    </BorderLayout>
  )
}
