import { Box, Container, Typography, Paper, Chip, alpha, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import RemoveIcon from '@mui/icons-material/Remove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { RootState } from "../store/store";

// Grade colors matching the MJ scale
const gradeColors: Record<number, { bg: string; text: string }> = {
    1: { bg: '#22c55e', text: '#ffffff' }, // Très Bien - Green
    2: { bg: '#84cc16', text: '#ffffff' }, // Bien - Lime
    3: { bg: '#eab308', text: '#ffffff' }, // Assez Bien - Yellow
    4: { bg: '#f97316', text: '#ffffff' }, // Passable - Orange
    5: { bg: '#ef4444', text: '#ffffff' }, // Insuffisant - Red
};

export const RankingExperiment = () => {
    const [showAll, setShowAll] = useState(false);
    const jmData = useSelector((state: RootState) => state.majorityJudgment.survey);

    if (!jmData || jmData.polls.length < 2) {
        return <Box sx={{ p: 4 }}>Loading...</Box>;
    }

    // Get last two polls to calculate rank changes
    const lastPoll = jmData.polls[0];
    const previousPoll = jmData.polls[1];
    const grades = jmData.poll_types.pt1.grades;

    // Build ranking data
    const rankings = Object.entries(lastPoll.results)
        .map(([candidateId, result]) => {
            const candidate = jmData.candidates[candidateId];
            const previousRank = previousPoll?.results[candidateId]?.rank;
            const rankChange = previousRank ? previousRank - result.rank : 0;
            const medianGrade = grades.find(g => g.rank === result.median_grade);

            return {
                candidateId,
                name: candidate.name,
                rank: result.rank,
                rankChange,
                medianGrade: medianGrade?.label || '',
                medianGradeRank: result.median_grade,
            };
        })
        .sort((a, b) => a.rank - b.rank);

    const displayedRankings = showAll ? rankings : rankings.slice(0, 6);

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            {/* Header */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 800,
                        fontFamily: 'DM Serif Display',
                        mb: 2,
                        background: 'linear-gradient(135deg, #2400FD 0%, #0A004C 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Classement 2027
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Jugement Majoritaire — Dernier sondage IPSOS
                </Typography>
            </Box>

            {/* Ranking Table */}
            <Paper
                elevation={0}
                sx={{
                    border: `1px solid ${alpha('#000', 0.08)}`,
                    borderRadius: 0.5,
                    overflow: 'hidden',
                }}
            >
                {/* Table Header */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '60px 1fr 100px 140px',
                        gap: 2,
                        p: 2,
                        bgcolor: alpha('#2400FD', 0.05),
                        borderBottom: `1px solid ${alpha('#000', 0.08)}`,
                    }}
                >
                    <Typography variant="caption" fontWeight={700} color="text.secondary">
                        RANG
                    </Typography>
                    <Typography variant="caption" fontWeight={700} color="text.secondary">
                        CANDIDAT
                    </Typography>
                    <Typography variant="caption" fontWeight={700} color="text.secondary" textAlign="center">
                        ÉVOL.
                    </Typography>
                    <Typography variant="caption" fontWeight={700} color="text.secondary" textAlign="center">
                        MENTION
                    </Typography>
                </Box>

                {/* Rankings */}
                {displayedRankings.map((candidate, index) => (
                    <Box
                        key={candidate.candidateId}
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '60px 1fr 100px 140px',
                            gap: 2,
                            p: 2,
                            alignItems: 'center',
                            borderBottom: index < displayedRankings.length - 1 ? `1px solid ${alpha('#000', 0.05)}` : 'none',
                            transition: 'background-color 0.2s',
                            '&:hover': {
                                bgcolor: alpha('#2400FD', 0.02),
                            },
                        }}
                    >
                        {/* Rank */}
                        <Box
                            sx={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: candidate.rank <= 3 ? 'primary.main' : alpha('#000', 0.05),
                                color: candidate.rank <= 3 ? 'white' : 'text.primary',
                                fontWeight: 800,
                                fontSize: '1.1rem',
                            }}
                        >
                            {candidate.rank}
                        </Box>

                        {/* Name */}
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 600,
                                fontSize: '1rem',
                            }}
                        >
                            {candidate.name}
                        </Typography>

                        {/* Rank Change */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                            {candidate.rankChange > 0 ? (
                                <>
                                    <TrendingUpIcon sx={{ color: '#22c55e', fontSize: 20 }} />
                                    <Typography variant="body2" sx={{ color: '#22c55e', fontWeight: 700 }}>
                                        +{candidate.rankChange}
                                    </Typography>
                                </>
                            ) : candidate.rankChange < 0 ? (
                                <>
                                    <TrendingDownIcon sx={{ color: '#ef4444', fontSize: 20 }} />
                                    <Typography variant="body2" sx={{ color: '#ef4444', fontWeight: 700 }}>
                                        {candidate.rankChange}
                                    </Typography>
                                </>
                            ) : (
                                <RemoveIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                            )}
                        </Box>

                        {/* Best Grade */}
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Chip
                                label={candidate.medianGrade}
                                sx={{
                                    bgcolor: gradeColors[candidate.medianGradeRank]?.bg || '#gray',
                                    color: gradeColors[candidate.medianGradeRank]?.text || '#000',
                                    fontWeight: 600,
                                    fontSize: '0.75rem',
                                    height: 24,
                                    '& .MuiChip-label': {
                                        px: 1.5,
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                ))}

                {/* Expand Button */}
                {rankings.length > 6 && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            p: 2,
                            borderTop: `1px solid ${alpha('#000', 0.05)}`,
                        }}
                    >
                        <IconButton
                            onClick={() => setShowAll(!showAll)}
                            sx={{
                                transform: showAll ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s',
                            }}
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </Box>
                )}
            </Paper>

            {/* Legend */}
            <Box sx={{ mt: 4, display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TrendingUpIcon sx={{ color: '#22c55e', fontSize: 18 }} />
                    <Typography variant="caption" color="text.secondary">
                        En hausse
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TrendingDownIcon sx={{ color: '#ef4444', fontSize: 18 }} />
                    <Typography variant="caption" color="text.secondary">
                        En baisse
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <RemoveIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
                    <Typography variant="caption" color="text.secondary">
                        Stable
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};
