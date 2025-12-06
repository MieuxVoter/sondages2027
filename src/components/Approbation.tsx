import { Container, Paper, Typography, Stack } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { InstituteSelector, defaultInstitutes } from "./InstituteSelector";
import { GenericRanking, type RankingColumn, type RankingRow } from "./GenericRanking";
import { ApprovalRateChart } from "./chart/echart/approval-rate-chart/ApprovalRateChart";
import { ApprovalEvolutionChart } from "./chart/echart/approval-evolution-chart/ApprovalEvolutionChart";
import { ChartCard } from "./share/ChartCard";
import type { RootState } from "../store/store";

// Column configuration for Approbation ranking (approval percentage instead of grade)
const approvalColumns: RankingColumn[] = [
    { id: 'rank', label: 'RANG', type: 'rank', width: '60px' },
    { id: 'name', label: 'CANDIDAT', type: 'name', width: '1fr' },
    { id: 'evolution', label: 'ÉVOL.', type: 'evolution', width: '80px' },
    { id: 'percentage', label: "% APPROBATION", type: 'percentage', width: '120px' },
];

export function Approbation() {
    const [selectedInstitute, setSelectedInstitute] = useState('ipsos');

    // Use approval data from store
    const approvalData = useSelector((state: RootState) => state.approval.survey);

    // Build ranking data from approval store
    const rankingData: RankingRow[] = [];
    if (approvalData && approvalData.polls.length >= 2) {
        const lastPoll = approvalData.polls[0];
        const previousPoll = approvalData.polls[1];

        Object.entries(lastPoll.results)
            .map(([candidateId, result]) => {
                const candidate = approvalData.candidates[candidateId];
                const previousRank = previousPoll?.results[candidateId]?.rank;
                const rankChange = previousRank ? previousRank - result.rank : 0;

                // Use the direct approval field from the API
                const approvalPercentage = result.approval;

                return {
                    id: candidateId,
                    rank: result.rank,
                    name: candidate.name,
                    rankChange,
                    percentage: approvalPercentage,
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
                    Le <strong>vote par approbation</strong> permet à chaque électeur d'approuver autant de candidats qu'il le souhaite. Le candidat avec le plus d'approbations l'emporte.
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', maxWidth: '800px' }}>
                    Cette méthode, bien que simple, présente une <strong>limitation fondamentale</strong> : la notion d'« approbation » est subjective et varie considérablement d'un électeur à l'autre. Pour certains, approuver signifie « excellent », pour d'autres « acceptable ». Cette ambiguïté rend l'agrégation des résultats moins fiable.
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', maxWidth: '800px' }}>
                    De plus, « approuver » n'est pas l'opposé de « désapprouver » : les électeurs expriment souvent le besoin d'une zone neutre, ce qu'un système binaire ne peut offrir. « <strong>Deux grades, c'est trop peu</strong> » pour capturer la richesse de l'opinion publique.
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
                    subtitle="Vote par Approbation — Dernier sondage IPSOS"
                    columns={approvalColumns}
                    data={rankingData}
                />

                {/* Approval Evolution Chart (% vs time) */}
                <ChartCard title="Évolution du taux d'approbation" height={500}>
                    <ApprovalEvolutionChart />
                </ChartCard>

                {/* Approval Rate by Poll Section (like merit profiles) */}
                <ChartCard title="Taux d'approbation par sondage" height={500}>
                    <ApprovalRateChart controlMode="buttons" />
                </ChartCard>
            </Stack>
        </Container>
    );
}
