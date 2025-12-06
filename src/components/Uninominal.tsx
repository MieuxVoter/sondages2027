import { Container, Paper, Typography, Stack } from "@mui/material";
import { SmpIntentionChart } from "./chart/echart/smp-intention-chart/SmpIntentionChart";
import { ChartCard } from "./share/ChartCard";

export function Uninominal() {

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Explanation Card */}
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, mb: 4, borderRadius: 0.5, bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', maxWidth: '800px' }}>
                    Le <strong>scrutin uninominal majoritaire</strong> est le système électoral traditionnel utilisé en France pour l'élection présidentielle. Chaque électeur vote pour un seul candidat, et le candidat avec le plus de voix l'emporte.
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', maxWidth: '800px' }}>
                    Ce système présente des <strong>limitations importantes</strong> : il encourage le vote stratégique (« vote utile »), pénalise les candidats proches idéologiquement, et peut éliminer dès le premier tour des candidats appréciés par une majorité.
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', maxWidth: '800px' }}>
                    Les sondages ci-dessous agrègent les intentions de vote de différents instituts avec une <strong>moyenne mobile sur 14 jours</strong> pour lisser les variations.
                </Typography>
            </Paper>

            <Stack spacing={6}>
                {/* Intention de vote Chart */}
                <ChartCard title="Intentions de vote - Élection présidentielle 2027" height={600}>
                    <SmpIntentionChart hideTitle />
                </ChartCard>
            </Stack>
        </Container>
    );
}
