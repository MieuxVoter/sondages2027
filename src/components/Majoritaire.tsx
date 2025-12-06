import { Container, Paper, Typography, Stack } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { InstituteSelector, defaultInstitutes } from "./InstituteSelector";
import { GenericRanking, type RankingColumn, type RankingRow } from "./GenericRanking";
import { MjMeritChart } from "./chart/echart/mj-merit-chart/MjMeritChart";
import { MjTimeMeritChart } from "./chart/echart/mj-time-merit-chart/MjTimeMerit";
import { MjRankingChart } from "./chart/echart/mj-ranking-chart/MjRankingChart";
import { ChartCard } from "./share/ChartCard";
import type { RootState } from "../store/store";

// Column configuration for JM ranking
const jmColumns: RankingColumn[] = [
    { id: 'rank', label: 'RANG', type: 'rank', width: '60px' },
    { id: 'name', label: 'CANDIDAT', type: 'name', width: '1fr' },
    { id: 'evolution', label: 'ÉVOL.', type: 'evolution', width: '80px' },
    { id: 'grade', label: 'MENTION', type: 'grade', width: '140px' },
    { id: 'percentage', label: '% MÉDIANE', type: 'percentage', width: '100px' },
];

export function Majoritaire() {
    const [selectedInstitute, setSelectedInstitute] = useState('ipsos');
    const jmData = useSelector((state: RootState) => state.majorityJudgment.survey);

    // Build ranking data from store
    const rankingData: RankingRow[] = [];
    if (jmData && jmData.polls.length >= 2) {
        const lastPoll = jmData.polls[0];
        const previousPoll = jmData.polls[1];
        const grades = jmData.poll_types.pt1.grades;

        Object.entries(lastPoll.results)
            .map(([candidateId, result]) => {
                const candidate = jmData.candidates[candidateId];
                const previousRank = previousPoll?.results[candidateId]?.rank;
                const rankChange = previousRank ? previousRank - result.rank : 0;
                const medianGrade = grades.find(g => g.rank === result.median_grade);

                // Calculate percentage: sum of all grades from best to median (inclusive)
                // This represents "% who gave the median grade or better"
                // distribution[0] to distribution[median_grade] (where 0 is best grade)
                // median_grade in data is 1-indexed (1 = best, 5 = worst for 5-grade scale)
                const medianGradeIndex = result.median_grade - 1; // Convert to 0-indexed
                const medianPercentage = result.distribution
                    .slice(0, medianGradeIndex + 1)
                    .reduce((sum, pct) => sum + pct, 0);

                return {
                    id: candidateId,
                    rank: result.rank,
                    name: candidate.name,
                    rankChange,
                    grade: medianGrade?.label || '',
                    gradeRank: result.median_grade,
                    percentage: medianPercentage,
                };
            })
            .sort((a, b) => a.rank - b.rank)
            .forEach(row => rankingData.push(row));
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Explanation Card */}
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, mb: 4, borderRadius: 0.5, bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', maxWidth: '800px' }}>
                    Le <strong>jugement majoritaire</strong> est une méthode de vote innovante où chaque électeur attribue une mention (très satisfait, plutôt satisfait, ni satisfait ni insatisfait, plutôt insatisfait, très insatisfait) à chaque candidat.
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', maxWidth: '800px' }}>
                    Le classement final est déterminé par la <strong>mention majoritaire</strong> de chaque candidat, c'est-à-dire la mention qui divise les évaluations en deux parts égales. Cette approche permet d'éviter les votes stratégiques et offre une représentation plus nuancée de l'opinion publique.
                </Typography>
            </Paper>

            {/* Institute Selector */}
            <InstituteSelector
                institutes={defaultInstitutes}
                selectedInstitute={selectedInstitute}
                onSelect={setSelectedInstitute}
            />

            <Stack spacing={6}>
                {/* Ranking Section */}
                <GenericRanking
                    title="Classement 2027"
                    subtitle="Jugement Majoritaire — Dernier sondage IPSOS"
                    columns={jmColumns}
                    data={rankingData}
                />

                {/* Merit Profile Section */}
                <ChartCard title="Profil de mérite par sondage" height={700}>
                    <MjMeritChart controlMode="buttons" hideTitle />
                </ChartCard>

                {/* Evolution per Candidate Section */}
                <ChartCard title="Évolution des mentions par candidat" height={500}>
                    <MjTimeMeritChart controlMode="buttons" hideTitle />
                </ChartCard>

                {/* Ranking Dynamics Section */}
                <ChartCard title="Classement des candidats à l'élection présidentielle 2027" height={500}>
                    <MjRankingChart hideTitle />
                </ChartCard>
            </Stack>
        </Container>
    );
}
