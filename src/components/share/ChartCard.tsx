import { Card, CardActionArea, CardContent, Typography, Box } from "@mui/material";
import type { FC, ReactNode } from "react";

interface ChartCardProps {
    title: string;
    description?: ReactNode;
    children: ReactNode;
    onClick?: () => void;
    height?: number | string;
}

export const ChartCard: FC<ChartCardProps> = ({ title, description, children, onClick, height = 400 }) => {
    const content = (
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                    {title}
                </Typography>
                {description && (
                    <Typography variant="body1" color="text.secondary">
                        {description}
                    </Typography>
                )}
            </Box>
            <Box sx={{ flexGrow: 1, minHeight: 0, width: '100%', height: height }}>
                {children}
            </Box>
        </CardContent>
    );

    return (
        <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
            }
        }}>
            {onClick ? (
                <CardActionArea
                    onClick={onClick}
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        p: 0
                    }}
                >
                    {content}
                </CardActionArea>
            ) : (
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {content}
                </Box>
            )}
        </Card>
    );
};