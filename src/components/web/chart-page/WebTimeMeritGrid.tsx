import { Box, Button, Paper } from "@mui/material"
import { useNavigate } from "@tanstack/react-router"
import type { FC } from "react"
import { useSelector } from "react-redux"
import { selectCandidateOrderedByLatestRank } from "../../../store/jm-slice/jm-selector"
import { MjTimeMeritChart } from "../../chart/echart/mj-time-merit-chart/MjTimeMerit"
import { ChartTitle } from "../../share/ChartTitle"

import { Thumbnail } from "../../share/Thumbnail"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export const WebTimeMeritGrid: FC = () => {
    const candidates = useSelector(selectCandidateOrderedByLatestRank)
    const navigate = useNavigate()

    return (
        <Box sx={{ width: 1, height: 1, pt: 1, position: 'relative' }}>
            <Box sx={{ width: 1, height: 1, overflow: 'auto', p: 4, display: 'flex', flexDirection: 'column' }}>
                <ChartTitle
                    title="Grille de profile de mérite"
                    subtitle1="Evolution du profile de mérite d'un candidat au cours du temps"
                />
                <Box sx={{
                    height: 1,
                    flexGrow: 1
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2,
                        p: 2,
                        justifyContent: 'start',
                    }}>
                        {
                            candidates.map((candidate) => {
                                return (
                                    <MjTimeMeritGridCard key={candidate.candidateId} candidateId={candidate.candidateId} />
                                )
                            })
                        }
                    </Box>
                </Box>
            </Box>
            <Button
                onClick={() => navigate({ to: '/majoritaire' })}
                startIcon={<ArrowBackIcon></ArrowBackIcon>}
                sx={{
                    position: 'absolute',
                    bottom: 32,
                    right: 40,
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                        bgcolor: 'primary.dark',
                    }
                }}
            >
                Retour
            </Button>
        </Box>
    )
}

const MjTimeMeritGridCard: React.FC<{ candidateId: string }> = ({ candidateId }) => {
    const navigate = useNavigate()
    const candidates = useSelector(selectCandidateOrderedByLatestRank)
    const candidate = candidates.find(c => c.candidateId === candidateId)
    const thumbnailSx = { height: "160px", width: "300px", PointerEvent: 'none' };

    return (
        <Paper
            onClick={() => navigate({ to: '/majoritaire/profile-merite-candidate/$candidateId', params: { candidateId } })}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: "200px",
                breakInside: 'avoid',
                cursor: 'pointer',
                '&:hover': {
                    boxShadow: 4,
                    transform: 'scale(1.02)',
                    transition: 'all 0.2s ease-in-out'
                }
            }}>
            <Box sx={{ pointerEvents: 'none' }}>
                <Thumbnail sx={thumbnailSx}>
                    <MjTimeMeritChart isThumbnail
                        candidateId={candidateId} />
                </Thumbnail>
                <Box sx={{ textAlign: 'center' }}>
                    {candidate?.name}
                </Box>
            </Box>
        </Paper>
    )
}