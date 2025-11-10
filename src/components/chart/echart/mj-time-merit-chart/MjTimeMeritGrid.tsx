import { Box, Card } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCandidateOrderedByLatestRank } from "../../../../store/jm-slice/jm-selector";
import { ChartTitle } from "../../../share/ChartTitle";
import { BorderLayout } from "../../../share/layout/BorderLayout";
import { Thumbnail } from "../../../share/Thumbnail";
import { MjTimeMeritChart } from "./MjTimeMerit";

interface MjTimMeritGridProps {
    isThumbnail?: boolean;
}

export const MjTimeMeritGrid: React.FC<MjTimMeritGridProps> = ({ isThumbnail = false }) => {
    const candidates = useSelector(selectCandidateOrderedByLatestRank)
    return (
        <BorderLayout
            north={!isThumbnail &&
                <ChartTitle
                    title="Grille de profile de mérite"
                    subtitle1="Evolution du profile de mérite d'un candidat au cours du temps"
                />
            }
            center={
                <Box sx={{
                    height: 1,
                    overflow: 'auto',
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
            }
        />
    )
}

const MjTimeMeritGridCard: React.FC<{ candidateId: string }> = ({ candidateId }) => {
    const candidates = useSelector(selectCandidateOrderedByLatestRank)
    const candidate = candidates.find(c => c.candidateId === candidateId)
    const thumbnailSx = { height: "100px", width: "150px" };
    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 1,
            height: "150px",
            breakInside: 'avoid',
            mb: 2
        }}>
            <Thumbnail sx={thumbnailSx}>
                <MjTimeMeritChart isThumbnail
                    candidateId={candidateId} />
            </Thumbnail>
            <Box sx={{ mt: 1, textAlign: 'center' }}>
                {candidate?.name}
            </Box>
        </Card>
    )
}