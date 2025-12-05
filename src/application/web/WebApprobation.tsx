import { Alert, Box } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { ChartCard } from "../../share/component/ChartCard";
import { ApprovalRankingChart } from "../chart/echart/approval-ranking-chart/ApprovalRankingChart";
import { ApprovalRateChart } from "../chart/echart/approval-rate-chart/ApprovalRateChart";

export const WebApprobation: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', p: 6 }}>
            <Alert severity="info" sx={{ mb: 4 }}>
                Le <strong>vote par approbation</strong> permet à chaque électeur d'approuver autant de candidats qu'il le souhaite. Le candidat avec le plus d'approbations l'emporte.
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
                        chart={<ApprovalRankingChart isThumbnail />}
                        onClick={() => navigate({ to: '/approbation/evolution-classement' })}
                        sx={{ flex: 1 }}
                    />
                    <ChartCard
                        title="Taux d'approbation - sondage unique"
                        description="Comparaison du taux d'approbation des différents candidats pour un sondage donné"
                        chart={<ApprovalRateChart isThumbnail />}
                        onClick={() => navigate({ to: '/approbation/taux-approbation' })}
                        sx={{ flex: 1 }}
                    />
                </Box>
            </Box>
        </Box>

    )
}

