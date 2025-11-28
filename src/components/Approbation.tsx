import { useNavigate } from "@tanstack/react-router";
import { MjMeritChart } from "./chart/echart/mj-merit-chart/MjMeritChart";
import { MjRankingChart } from "./chart/echart/mj-ranking-chart/MjRankingChart";
import { MjTimeMeritChart } from "./chart/echart/mj-time-merit-chart/MjTimeMerit";
import { ChartCard } from "./share/ChartCard";

import { Container, Grid, Typography, Paper } from "@mui/material";

export function Approbation() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, mb: 6, borderRadius: 4, bgcolor: 'primary.main', color: 'white' }}>
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

      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Visualisations
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <ChartCard
            title="Evolution du Classement"
            description="Evolution du classement des candidats sondage après sondage"
            onClick={() => navigate({ to: '/majoritaire/evolution-classement' })}
          >
            <MjRankingChart isThumbnail />
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ChartCard
            title="Profile de mérite - sondage unique"
            description="Comparaison du profile de mérite des différents candidats pour un sondage donné"
            onClick={() => navigate({ to: '/majoritaire/profile-merite-sondage' })}
          >
            <MjMeritChart isThumbnail />
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ChartCard
            title="Grille de profile de mérite"
            description="Evolution du profile de mérite d'un candidat au cours du temps"
            onClick={() => navigate({ to: '/majoritaire/grille-profile-merite' })}
          >
            <MjTimeMeritChart isThumbnail />
          </ChartCard>
        </Grid>
      </Grid>
    </Container>
  )
}
