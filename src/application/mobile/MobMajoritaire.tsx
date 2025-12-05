import { Box } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { ChartCard } from "../../share/component/ChartCard";
import { MjMeritChart } from "../chart/echart/mj-merit-chart/MjMeritChart";
import { MjRankingChart } from "../chart/echart/mj-ranking-chart/MjRankingChart";
import { MjTimeMeritChart } from "../chart/echart/mj-time-merit-chart/MjTimeMerit";

export const MobMajoritaire: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 2, p: 2 }}>
            <ChartCard
                title="Evolution du Classement"
                description="Evolution du classement des candidats sondage après sondage"
                chart={<MjRankingChart isThumbnail />}
                onClick={() => navigate({ to: '/majoritaire/evolution-classement' })}
                sx={{ flex: 1, width: 1 }}
            />
            <ChartCard
                title="Profile de mérite - sondage unique"
                description="Comparaison du profile de mérite des différents candidats pour un sondage donné"
                chart={<MjMeritChart isThumbnail />}
                onClick={() => navigate({ to: '/majoritaire/profile-merite-sondage' })}
                sx={{ flex: 1, width: 1 }}
            />
            <ChartCard
                title="Grille de profile de mérite"
                description="Evolution du profile de mérite d'un candidat au cours du temps"
                chart={<MjTimeMeritChart isThumbnail />}
                onClick={() => navigate({ to: '/majoritaire/grille-profile-merite' })}
                sx={{ flex: 1, width: 1 }}
            />
        </Box>
    )
}