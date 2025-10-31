import { alpha, Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { MjRankingChart } from "../chart/echart/ranking-chart/MjRankingChart";
import { Thumbnail } from "../share/Thumbnail";

export const MobMajoritaire: React.FC = () => {
    const theme = useTheme();
    const thumbnailSx = { height: "200px", width: 1, bgcolor: alpha(theme.palette.info.main, 0.07) };
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 2, p: 2 }}>
            <Card elevation={2} sx={{ width: 1 }}>
                <Thumbnail sx={thumbnailSx}>
                    <MjRankingChart />
                </Thumbnail>
                <CardContent>
                    <Typography variant="h6">Evolution du Classement</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Evolution du classement des candidats sondage après sondage
                    </Typography>
                </CardContent>
            </Card>
            <Card elevation={2} sx={{ width: 1 }}>
                <Thumbnail sx={thumbnailSx}>
                    <MjRankingChart />
                </Thumbnail>
                <CardContent>
                    <Typography variant="h6">Profile de mérite - sondage unique</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Comparaison du profile de mérite des différents candidats pour un sondage donné
                    </Typography>
                </CardContent>
            </Card>
            <Card elevation={2} sx={{ width: 1 }}>
                <Thumbnail sx={thumbnailSx}>
                    <MjRankingChart />
                </Thumbnail>
                <CardContent>
                    <Typography variant="h6">Grille de profile de mérite</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Evolution du profile de mérite d'un candidat au cours du temps
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}