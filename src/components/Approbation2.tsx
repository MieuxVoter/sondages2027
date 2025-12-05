import { Container, Paper, Typography, Box, Stack } from "@mui/material";
import { RankingExperimentApprobation } from "./RankingExperimentApprobation";
import { MjMeritChart } from "./chart/echart/mj-merit-chart/MjMeritChart";
import { MjTimeMeritChart } from "./chart/echart/mj-time-merit-chart/MjTimeMerit";
import { ChartCard } from "./share/ChartCard";

export function Approbation2() {
    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Explanation Card */}
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, mb: 6, borderRadius: 0.5, bgcolor: 'primary.main', color: 'white' }}>
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

            <Stack spacing={6}>
                {/* Ranking Section */}
                <Box>
                    <RankingExperimentApprobation />
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
