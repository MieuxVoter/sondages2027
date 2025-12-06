import { Box, IconButton, MenuItem, Select, Typography, Button } from "@mui/material";
import { Apps } from "@mui/icons-material";
import type { EChartsOption } from "echarts";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "@tanstack/react-router";
import { selectCandidateInfo, selectCandidateOrderedByLatestRank, selectPt1DatesForCandidate, selectTimeMeritChartSeriesByCandidateIdForECharts } from "../../../../store/jm-slice/jm-selector";
import type { RootState } from "../../../../store/store";
import Chart from "../../../share/Chart";
import { ChartTitle } from "../../../share/ChartTitle";

import { timeMeritConfig } from "./timeMeritConfig";

interface MjTimeMeritChartProps {
    candidateId?: string
    isThumbnail?: boolean;
    height?: number | string;
    controlMode?: 'select' | 'buttons';
    hideTitle?: boolean;
}

export const MjTimeMeritChart: React.FC<MjTimeMeritChartProps> = ({ candidateId, isThumbnail = false, height, controlMode = 'select', hideTitle = false }) => {
    const navigate = useNavigate()
    const candidates = useSelector(selectCandidateOrderedByLatestRank)
    const [selectedCandidate, setSelectedCandidate] = useState<string>(candidateId ?? candidates[0]?.candidateId)
    const candidateInfo = useSelector((state: RootState) => selectCandidateInfo(state, selectedCandidate));
    const dates = useSelector((state: RootState) => selectPt1DatesForCandidate(state, selectedCandidate));
    const series = useSelector((state: RootState) => selectTimeMeritChartSeriesByCandidateIdForECharts(state, selectedCandidate));

    const timeMeritChartOption: EChartsOption = {
        ...timeMeritConfig,
        xAxis: {
            ...(timeMeritConfig.xAxis as any),
            data: dates.map(d => new Date(d.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })).reverse()
        },
        series: series.map(s => ({
            ...s,
            type: 'line',
            stack: 'total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            }
        }))
    };

    const handleCandidateChange = (newCandidateId: string) => {
        setSelectedCandidate(newCandidateId);
        // Only navigate if we are NOT in buttons mode (which implies embedded view where we might not want URL updates or we handle it differently)
        // Actually user said "last card, is the time merit profil of candidates where there is a button to swtich candaidates"
        // If we are in Majoritaire2, we probably don't want to change the URL to /profile-merite-candidate/ID
        if (controlMode === 'select') {
            navigate({ to: '/majoritaire/profile-merite-candidate/$candidateId', params: { candidateId: newCandidateId } });
        }
    };

    const currentIndex = candidates.findIndex(c => c.candidateId === selectedCandidate);

    return (
        <Box sx={{ width: 1, height: 1, display: 'flex', flexDirection: 'column' }}>
            {!isThumbnail && !hideTitle &&
                <ChartTitle
                    title={`Évolution des mentions pour ${candidateInfo?.name}`}
                    subtitle1="Source : IPSOS - La Tribune Dimanche"
                />
            }
            <Box sx={{ width: 1, flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                {
                    !isThumbnail &&
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', gap: 2, mb: 2 }}>
                        <Typography color="text.secondary"> Candidat :</Typography>
                        {controlMode === 'select' ? (
                            <Select
                                size="small"
                                labelId="candidate-select-label"
                                id="candidate-select"
                                value={selectedCandidate}
                                onChange={(e) => handleCandidateChange(e.target.value)}
                            >
                                {candidates?.map(({ candidateId, name }) => {
                                    return (
                                        <MenuItem key={candidateId} value={candidateId}>
                                            {name}
                                        </MenuItem>
                                    )
                                })
                                }
                            </Select>
                        ) : (
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button
                                    variant="outlined"
                                    disabled={currentIndex <= 0}
                                    onClick={() => handleCandidateChange(candidates[currentIndex - 1].candidateId)}
                                >
                                    Précédent
                                </Button>
                                <Typography sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', px: 2 }}>
                                    {candidateInfo?.name}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    disabled={currentIndex >= candidates.length - 1}
                                    onClick={() => handleCandidateChange(candidates[currentIndex + 1].candidateId)}
                                >
                                    Suivant
                                </Button>
                            </Box>
                        )}
                        {controlMode === 'select' && (
                            <IconButton
                                onClick={() => navigate({ to: '/majoritaire/grille-profile-merite' })}
                                color="primary"
                                size="small"
                            >
                                <Apps />
                            </IconButton>
                        )}
                    </Box>
                }
                <Box sx={{ width: 1, flex: height ? 'none' : 1, height: height || '100%', minHeight: 0 }}>
                    <Chart option={timeMeritChartOption} />
                </Box>
            </Box>
        </Box>
    )
}
