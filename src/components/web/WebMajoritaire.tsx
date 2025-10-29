import { Alert, Box, Card, CardContent, Typography, alpha, useTheme } from "@mui/material";
import { JmRankingChart } from "../chart/echart/JmRankingChart";
import { Thumbnail } from "../share/Thumbnail";
import { JmMeritChart } from "../chart/echart/JmMeritChart";
import { JmTimeMeritChart } from "../chart/echart/JmTimeMerit";

export const WebMajoritaire: React.FC = () => {
    const theme = useTheme();
    const thumbnailSx = { height: "200px", width: 1, bgcolor: alpha(theme.palette.info.main, 0.07) };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', p: 6 }}>
            <Alert severity="info" sx={{ mb: 4 }}>
                Le <strong>jugement majoritaire</strong> est une méthode de vote innovante où chaque électeur attribue une mention (très satisfait, plutôt satisfait, ni satisfait ni insatisfait, plutôt insatisfait, très insatisfait) à chaque candidat.
                <br /><br />
                Le classement final est déterminé par la <strong>mention majoritaire</strong> de chaque candidat, c'est-à-dire la mention qui divise les évaluations en deux parts égales. Cette approche permet d'éviter les votes stratégiques et offre une représentation plus nuancée de l'opinion publique.
            </Alert>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4, width: '100%' }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Card sx={{ flex: 1 }}>
                        <Thumbnail sx={thumbnailSx}>
                            <JmRankingChart />
                        </Thumbnail>
                        <CardContent>
                            <Typography variant="h6">Evolution du Classement</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Evolution du classement des candidats sondage après sondage
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ flex: 1, }}>
                        <Thumbnail sx={thumbnailSx}>
                            <JmMeritChart/>
                        </Thumbnail>
                        <CardContent>
                            <Typography variant="h6">Profile de mérite - sondage unique</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Comparaison du profile de mérite des différents candidats pour un sondage donné
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Card sx={{ flex: 1, maxWidth: 'calc(50% - 4px)' }}>
                        <Thumbnail sx={thumbnailSx}>
                            <JmTimeMeritChart />
                        </Thumbnail>
                        <CardContent>
                            <Typography variant="h6">Grille de profile de mérite</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Evolution du profile de mérite d'un candidat au cours du temps
                            </Typography>
                        </CardContent>
                    </Card>
                    
                </Box>
            </Box>
        </Box>

    )
}