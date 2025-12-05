import { Alert, Box } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { ChartCard } from "../../share/component/ChartCard";
import { MjMeritChart } from "../chart/echart/mj-merit-chart/MjMeritChart";
import { MjRankingChart } from "../chart/echart/mj-ranking-chart/MjRankingChart";

export const WebApprobation: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', p: 6 }}>
            <Alert severity="info" sx={{ mb: 4 }}>
                Le <strong>vote par approbationn</strong> permet à chaque électeur d'approuver autant de candidats qu'il le souhaite. Le candidat avec le plus d'approbations l'emporte.
                <br /><br />
                Cette méthode, bien que simple, présente une <strong>limitation fondamentale</strong> : la notion d'« approbation » est subjective et varie considérablement d'un électeur à l'autre. Pour certains, approuver signifie « excellent », pour d'autres « acceptable ». Cette ambiguïté rend l'agrégation des résultats moins fiable.
                <br /><br />
                De plus, « approuver » n'est pas l'opposé de « désapprouver » : les électeurs expriment souvent le besoin d'une zone neutre, ce qu'un système binaire ne peut offrir. « <strong>Deux grades, c'est trop peu</strong> » pour capturer la richesse de l'opinion publique.
            </Alert>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4, width: '100%' }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <ChartCard
                        title="Evolution du Classement"
                        description="Evolution du classement des candidats sondage après sondage"
                        chart={<MjRankingChart isThumbnail />}
                        onClick={() => navigate({ to: '/majoritaire/evolution-classement' })}
                        sx={{ flex: 1 }}
                    />
                    <ChartCard
                        title="Profile de mérite - sondage unique"
                        description="Comparaison du profile de mérite des différents candidats pour un sondage donné"
                        chart={<MjMeritChart isThumbnail />}
                        onClick={() => navigate({ to: '/majoritaire/profile-merite-sondage' })}
                        sx={{ flex: 1 }}
                    />
                </Box>
                {/* <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <ChartCard
                        title="Grille de profile de mérite"
                        description="Evolution du profile de mérite d'un candidat au cours du temps"
                        chart={<MjTimeMeritChart isThumbnail/>}
                        onClick={() => navigate({ to: '/majoritaire/grille-profile-merite' })}
                        sx={{ flex: 1, maxWidth: 'calc(50% - 4px)' }}
                    />
                </Box> */}
            </Box>
        </Box>

    )
}

