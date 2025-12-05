import { Container, Paper, Typography, Box, Stack } from "@mui/material";
import { RankingExperiment } from "./RankingExperiment";
import { MjMeritChart } from "./chart/echart/mj-merit-chart/MjMeritChart";
import { MjTimeMeritChart } from "./chart/echart/mj-time-merit-chart/MjTimeMerit";
import { ChartCard } from "./share/ChartCard";

export function Majoritaire2() {
    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Explanation Card */}
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, mb: 6, borderRadius: 0.5, bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', maxWidth: '800px' }}>
                    Le <strong>jugement majoritaire</strong> est une méthode de vote innovante où chaque électeur attribue une mention (très satisfait, plutôt satisfait, ni satisfait ni insatisfait, plutôt insatisfait, très insatisfait) à chaque candidat.
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', maxWidth: '800px' }}>
                    Le classement final est déterminé par la <strong>mention majoritaire</strong> de chaque candidat, c'est-à-dire la mention qui divise les évaluations en deux parts égales. Cette approche permet d'éviter les votes stratégiques et offre une représentation plus nuancée de l'opinion publique.
                </Typography>
            </Paper>

            <Stack spacing={6}>
                {/* Ranking Section */}
                <Box>
                    <RankingExperiment />
                </Box>

                {/* Merit Profile Section */}
                <ChartCard title="Profil de mérite" height={500}>
                    <MjMeritChart controlMode="buttons" />
                </ChartCard>

                {/* Time Merit Profile Section */}
                <ChartCard title="Évolution des mentions" height={500}>
                    <MjTimeMeritChart controlMode="buttons" />
                </ChartCard>
            </Stack>
        </Container>
    );
}
