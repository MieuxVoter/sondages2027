import { Alert, Box } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { JmMeritChart } from "../chart/echart/JmMeritChart";
import { JmTimeMeritChart } from "../chart/echart/JmTimeMerit";
import { MjRankingChart } from "../chart/echart/ranking-chart/MjRankingChart";
import { ChartCard } from "../share/ChartCard";

export const WebMajoritaire: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', p: 6 }}>
            <Alert severity="info" sx={{ mb: 4 }}>
                Le <strong>jugement majoritaire</strong> est une méthode de vote innovante où chaque électeur attribue une mention (très satisfait, plutôt satisfait, ni satisfait ni insatisfait, plutôt insatisfait, très insatisfait) à chaque candidat.
                <br /><br />
                Le classement final est déterminé par la <strong>mention majoritaire</strong> de chaque candidat, c'est-à-dire la mention qui divise les évaluations en deux parts égales. Cette approche permet d'éviter les votes stratégiques et offre une représentation plus nuancée de l'opinion publique.
            </Alert>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4, width: '100%' }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <ChartCard
                        title="Evolution du Classement"
                        description="Evolution du classement des candidats sondage après sondage"
                        chart={<MjRankingChart />}
                        onClick={() => navigate({ to: '/majoritaire/evolution-classement' })}
                        sx={{ flex: 1 }}
                    />
                    <ChartCard
                        title="Profile de mérite - sondage unique"
                        description="Comparaison du profile de mérite des différents candidats pour un sondage donné"
                        chart={<JmMeritChart />}
                        onClick={() => navigate({ to: '/majoritaire/profile-merite-sondage' })}
                        sx={{ flex: 1 }}
                    />
                </Box>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <ChartCard
                        title="Grille de profile de mérite"
                        description="Evolution du profile de mérite d'un candidat au cours du temps"
                        chart={<JmTimeMeritChart />}
                        onClick={() => navigate({ to: '/majoritaire/grille-profile-merite' })}
                        sx={{ flex: 1, maxWidth: 'calc(50% - 4px)' }}
                    />
                </Box>
            </Box>
        </Box>

    )
}

