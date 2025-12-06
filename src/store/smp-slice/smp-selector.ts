import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

const selectSmpData = (state: RootState) => state.smp.survey;

// Get last poll date
export const selectLastSmpDate = createSelector(
    [selectSmpData],
    (smpData): string | null => {
        if (!smpData) return null;
        return smpData.dernier_sondage;
    }
);

// Get all candidates with their latest intention value, sorted by value descending
export const selectCandidatesOrderedByIntention = createSelector(
    [selectSmpData],
    (smpData) => {
        if (!smpData) return [];

        return Object.entries(smpData.candidats)
            .map(([name, candidate]) => {
                const lastIndex = candidate.intentions_moy_14d.valeur.length - 1;
                const lastValue = lastIndex >= 0 ? candidate.intentions_moy_14d.valeur[lastIndex] : 0;
                return {
                    name,
                    color: candidate.couleur,
                    lastIntention: lastValue,
                };
            })
            .sort((a, b) => b.lastIntention - a.lastIntention);
    }
);

// Helper to process data with gaps
const processDataWithGaps = (dates: string[], values: number[], maxGapDays = 60) => {
    const result: (string | number | null)[][] = [];
    for (let i = 0; i < dates.length; i++) {
        if (i > 0) {
            const prevDate = new Date(dates[i - 1]);
            const currDate = new Date(dates[i]);
            const diffTime = Math.abs(currDate.getTime() - prevDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays > maxGapDays) {
                // Insert a break point
                // We use the current date but with null value to break the line immediately before this point
                // Actually, to break the line between prev and curr, we can insert a null at currDate
                // ECharts will not draw the segment to this point, then start drawing from this point (if valid)?
                // No, if value is null, it's a gap.
                // If we want a gap *between* i-1 and i, we need to ensure the line stops at i-1 and starts at i.
                // If we insert [currDate, null], the point at currDate is null, so nothing is drawn there.
                // But we want the point at i to be drawn.
                // So we need an intermediate null.
                // Let's just insert a null entry. ECharts handles null in the array.
                // But we are using [date, value] format.
                // We can insert [midDate, null].
                const midTime = (prevDate.getTime() + currDate.getTime()) / 2;
                const midDate = new Date(midTime).toISOString().split('T')[0];
                result.push([midDate, null]);
            }
        }
        result.push([dates[i], values[i]]);
    }
    return result;
};

// ECharts series data for smooth curves (moyenne mobile 14j)
// This is the main line curve - uses the rolling average, NOT connecting dots
export const selectSmpLineSeries = createSelector(
    [selectSmpData],
    (smpData) => {
        if (!smpData) return [];

        return Object.entries(smpData.candidats).map(([name, candidate]) => {
            // Use intentions_moy_14d for smooth curve (rolling average)
            // Process gaps
            const data = processDataWithGaps(
                candidate.intentions_moy_14d.end_date,
                candidate.intentions_moy_14d.valeur
            );

            return {
                name,
                type: 'line' as const,
                data,
                smooth: false, // Don't interpolate - data is already smoothed
                showSymbol: false,
                animation: true,
                animationDuration: 2000,
                animationEasing: 'cubicOut' as const,
                lineStyle: {
                    color: candidate.couleur,
                    width: 2
                },
                itemStyle: {
                    color: candidate.couleur
                },
                // Disable default endLabel as we use custom positioning
                endLabel: {
                    show: false
                },
                emphasis: {
                    lineStyle: {
                        width: 4
                    }
                },
                z: 10, // Above area series
            };
        });
    }
);

// ECharts series for manually positioned labels
export const selectSmpLabelSeries = createSelector(
    [selectSmpData, selectCandidatesOrderedByIntention],
    (smpData, rankedCandidates) => {
        if (!smpData) return [];

        // Create a map of rank for each candidate
        const rankMap = new Map<string, number>();
        rankedCandidates.forEach((c, index) => {
            rankMap.set(c.name, index + 1);
        });

        const lastDate = smpData.dernier_sondage;

        return Object.entries(smpData.candidats).map(([name, candidate]) => {
            const rank = rankMap.get(name) || 99;
            const lastValue = candidate.intentions_moy_14d.valeur[candidate.intentions_moy_14d.valeur.length - 1];

            // Manual positioning formula
            let y_right = lastValue;
            if (rank <= 2) {
                y_right = 36 * (1 - 1 / 20 * (rank - 1));
            } else if (rank === 3) {
                y_right = 18;
            } else {
                y_right = 16 * (1 - 1 / 22 * (rank - 1 - 2));
            }

            return {
                name: `${name}_label`,
                type: 'scatter' as const,
                data: [[lastDate, y_right]],
                symbolSize: 0, // Invisible point
                label: {
                    show: true,
                    formatter: () => `{b|${name}} {c|${Math.round(lastValue)}%}`,
                    position: 'right',
                    distance: 10,
                    rich: {
                        b: {
                            fontWeight: 'bold',
                            color: candidate.couleur,
                            fontSize: 12
                        },
                        c: {
                            color: candidate.couleur,
                            fontSize: 12
                        }
                    }
                },
                z: 100
            };
        });
    }
);

// ECharts series data for confidence areas (error bands)
export const selectSmpAreaSeries = createSelector(
    [selectSmpData],
    (smpData) => {
        if (!smpData) return [];

        const series: any[] = [];

        Object.entries(smpData.candidats).forEach(([name, candidate]) => {
            const dates = candidate.intentions_moy_14d.end_date;
            const erreurInf = candidate.intentions_moy_14d.erreur_inf;
            const erreurSup = candidate.intentions_moy_14d.erreur_sup;

            // Process gaps for lower bound
            const lowerData = processDataWithGaps(dates, erreurInf);

            // Process gaps for band width (sup - inf)
            const bandValues = erreurSup.map((sup, i) => sup - erreurInf[i]);
            const bandData = processDataWithGaps(dates, bandValues);

            // For ECharts, we use two lines with area between them
            // Lower bound line (invisible)
            series.push({
                name: `${name}_erreur_inf`,
                type: 'line',
                data: lowerData,
                lineStyle: { opacity: 0 },
                showSymbol: false,
                stack: `band_${name}`,
                stackStrategy: 'all',
                silent: true,
                z: 1,
            });

            // Band between lower and upper (the difference)
            series.push({
                name: `${name}_band`,
                type: 'line',
                data: bandData,
                lineStyle: { opacity: 0 },
                showSymbol: false,
                stack: `band_${name}`,
                stackStrategy: 'all',
                areaStyle: {
                    color: candidate.couleur,
                    opacity: 0.2 // Increased from 0.15 to match Python's 0.2
                },
                silent: true,
                z: 1,
            });
        });

        return series;
    }
);

// ECharts series data for raw poll points (scatter)
// These are the individual poll data points - NOT connected
export const selectSmpScatterSeries = createSelector(
    [selectSmpData],
    (smpData) => {
        if (!smpData) return [];

        return Object.entries(smpData.candidats).map(([name, candidate]) => {
            const data = candidate.intentions.fin_enquete.map((date, i) => ({
                value: [date, candidate.intentions.valeur[i]],
                institut: candidate.intentions.institut[i],
                commanditaire: candidate.intentions.commanditaire[i],
            }));

            return {
                name: `${name} (sondages)`,
                type: 'scatter' as const,
                data,
                symbol: 'circle',
                symbolSize: 5,
                itemStyle: {
                    color: candidate.couleur,
                    opacity: 0.6
                },
                z: 20, // On top
            };
        });
    }
);

// Calculate max Y value for axis
export const selectSmpMaxValue = createSelector(
    [selectSmpData],
    (smpData) => {
        if (!smpData) return 40;

        let maxVal = 0;
        Object.values(smpData.candidats).forEach(candidate => {
            const candidateMax = Math.max(...candidate.intentions_moy_14d.valeur);
            if (candidateMax > maxVal) maxVal = candidateMax;
        });

        return Math.ceil(maxVal / 5) * 5 + 5; // Round up to nearest 5, plus margin
    }
);
