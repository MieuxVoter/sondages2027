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
    const thumbnailSx = { height: "200px", width: 1, bgcolor: "white" };





    return (
        <Card sx={{
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            borderRadius: '15px',
            textTransform: 'none',
            boxShadow: `0 8px 20px ${alpha('#2400FD', 0.25)}`,
            '&:hover': {
                boxShadow: `0 12px 10px ${alpha('#2400FD', 0.35)}`,
                transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease', ...sx
        }} onClick={onClick}>
            <Box sx={{ pointerEvents: 'none' }}>
                <Thumbnail sx={thumbnailSx}>
                    {chart}
                </Thumbnail>
            </Box>
            <CardContent>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2" color="">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};