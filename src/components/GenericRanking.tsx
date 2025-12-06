import { Box, Paper, Typography, Chip, alpha, IconButton } from "@mui/material";
import { useState } from "react";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import RemoveIcon from '@mui/icons-material/Remove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { FC, ReactNode } from "react";

// Grade colors matching the MJ scale
const gradeColors: Record<number, { bg: string; text: string }> = {
    1: { bg: '#22c55e', text: '#ffffff' }, // Très Bien - Green
    2: { bg: '#84cc16', text: '#ffffff' }, // Bien - Lime
    3: { bg: '#eab308', text: '#ffffff' }, // Assez Bien - Yellow
    4: { bg: '#f97316', text: '#ffffff' }, // Passable - Orange
    5: { bg: '#ef4444', text: '#ffffff' }, // Insuffisant - Red
};

export interface RankingColumn {
    id: string;
    label: string;
    type: 'rank' | 'name' | 'evolution' | 'grade' | 'percentage';
    width?: string;
}

export interface RankingRow {
    id: string;
    rank: number;
    name: string;
    rankChange: number;
    grade?: string;
    gradeRank?: number;
    percentage?: number;
}

interface GenericRankingProps {
    title: string;
    subtitle?: string;
    columns: RankingColumn[];
    data: RankingRow[];
    initialShowCount?: number;
}

export const GenericRanking: FC<GenericRankingProps> = ({
    title,
    subtitle,
    columns,
    data,
    initialShowCount = 6,
}) => {
    const [showAll, setShowAll] = useState(false);
    const displayedData = showAll ? data : data.slice(0, initialShowCount);

    // Build grid template columns based on column config
    const gridTemplateColumns = columns.map(col => col.width || '1fr').join(' ');

    const renderCell = (row: RankingRow, column: RankingColumn): ReactNode => {
        switch (column.type) {
            case 'rank':
                return (
                    <Box
                        sx={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: row.rank <= 3 ? 'primary.main' : alpha('#000', 0.05),
                            color: row.rank <= 3 ? 'white' : 'text.primary',
                            fontWeight: 800,
                            fontSize: '0.9rem',
                        }}
                    >
                        {row.rank}
                    </Box>
                );

            case 'name':
                return (
                    <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                        {row.name}
                    </Typography>
                );

            case 'evolution':
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                        {row.rankChange > 0 ? (
                            <>
                                <TrendingUpIcon sx={{ color: '#22c55e', fontSize: 20 }} />
                                <Typography variant="body2" sx={{ color: '#22c55e', fontWeight: 700 }}>
                                    +{row.rankChange}
                                </Typography>
                            </>
                        ) : row.rankChange < 0 ? (
                            <>
                                <TrendingDownIcon sx={{ color: '#ef4444', fontSize: 20 }} />
                                <Typography variant="body2" sx={{ color: '#ef4444', fontWeight: 700 }}>
                                    {row.rankChange}
                                </Typography>
                            </>
                        ) : (
                            <RemoveIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                        )}
                    </Box>
                );

            case 'grade':
                return (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Chip
                            label={row.grade}
                            sx={{
                                bgcolor: gradeColors[row.gradeRank || 3]?.bg || '#gray',
                                color: gradeColors[row.gradeRank || 3]?.text || '#000',
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                height: 24,
                                '& .MuiChip-label': { px: 1.5 },
                            }}
                        />
                    </Box>
                );

            case 'percentage':
                return (
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 700,
                            textAlign: 'center',
                            color: (row.percentage || 0) >= 50 ? '#22c55e' : 'text.primary',
                        }}
                    >
                        {row.percentage?.toFixed(1)}%
                    </Typography>
                );

            default:
                return null;
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            {/* Header */}
            <Box sx={{ mb: 3, textAlign: 'center' }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 800,
                        fontFamily: 'DM Serif Display',
                        mb: 1,
                        background: 'linear-gradient(135deg, #2400FD 0%, #0A004C 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    {title}
                </Typography>
                {subtitle && (
                    <Typography variant="body1" color="text.secondary">
                        {subtitle}
                    </Typography>
                )}
            </Box>

            {/* Table */}
            <Paper
                elevation={0}
                sx={{
                    border: `1px solid ${alpha('#000', 0.08)}`,
                    borderRadius: 0.5,
                    overflow: 'hidden',
                }}
            >
                {/* Table Header */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns,
                        gap: 2,
                        p: 2,
                        bgcolor: alpha('#2400FD', 0.05),
                        borderBottom: `1px solid ${alpha('#000', 0.08)}`,
                    }}
                >
                    {columns.map((col) => (
                        <Typography
                            key={col.id}
                            variant="caption"
                            fontWeight={700}
                            color="text.secondary"
                            sx={{ textAlign: col.type === 'name' ? 'left' : 'center' }}
                        >
                            {col.label}
                        </Typography>
                    ))}
                </Box>

                {/* Table Rows */}
                {displayedData.map((row, index) => (
                    <Box
                        key={row.id}
                        sx={{
                            display: 'grid',
                            gridTemplateColumns,
                            gap: 2,
                            p: 2,
                            alignItems: 'center',
                            borderBottom: index < displayedData.length - 1 ? `1px solid ${alpha('#000', 0.05)}` : 'none',
                            transition: 'background-color 0.2s',
                            '&:hover': { bgcolor: alpha('#2400FD', 0.02) },
                        }}
                    >
                        {columns.map((col) => (
                            <Box key={col.id}>{renderCell(row, col)}</Box>
                        ))}
                    </Box>
                ))}

                {/* Expand Button */}
                {data.length > initialShowCount && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            p: 2,
                            borderTop: `1px solid ${alpha('#000', 0.05)}`,
                        }}
                    >
                        <IconButton
                            onClick={() => setShowAll(!showAll)}
                            sx={{
                                transform: showAll ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s',
                            }}
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </Box>
                )}
            </Paper>

            {/* Legend */}
            <Box sx={{ mt: 3, display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TrendingUpIcon sx={{ color: '#22c55e', fontSize: 18 }} />
                    <Typography variant="caption" color="text.secondary">En hausse</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TrendingDownIcon sx={{ color: '#ef4444', fontSize: 18 }} />
                    <Typography variant="caption" color="text.secondary">En baisse</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <RemoveIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
                    <Typography variant="caption" color="text.secondary">Stable</Typography>
                </Box>
            </Box>
        </Box>
    );
};
