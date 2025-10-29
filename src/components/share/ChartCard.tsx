import { alpha, Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { Thumbnail } from "./Thumbnail";

interface ChartCardProps {
    title: string;
    description: string;
    chart: React.ReactNode;
    onClick: () => void;
    sx?: any;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, description, chart, onClick, sx }) => {
    const theme = useTheme();
    const thumbnailSx = { height: "200px", width: 1, bgcolor: alpha(theme.palette.info.main, 0.07) };

    return (
        <Card sx={{ cursor: 'pointer', ...sx }} onClick={onClick}>
            <Box sx={{ pointerEvents: 'none' }}>
                <Thumbnail sx={thumbnailSx}>
                    {chart}
                </Thumbnail>
            </Box>
            <CardContent>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};