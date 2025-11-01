import { createSelector } from '@reduxjs/toolkit';
import type { CandidateRankings, EChartsSeriesData } from '../../types/survey.types';
import type { RootState } from '../store';

const selectJmData = (state: RootState) => state.majorityJudgment.jmData;

// Sélecteur pour les dates de pt1 (deuxième date)
export const selectPt1Dates = createSelector(
    [selectJmData],
    (jmData): string[] => {
        if (!jmData) {
            return [];
        }

        return jmData.polls
            .filter(poll => poll.poll_type_id === 'pt1')
            .map(poll => poll.field_dates[1])
            .filter((date): date is string => date !== undefined)
            .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    }
);

export const selectGradRankLimits = createSelector(
    [selectJmData],
    (jmData): Record<string, Record<number, number>> => {
        if (!jmData) {
            return {};
        }

        const gradRankLimits = jmData.poll_types.pt1.grades.reduce((acc, grade) => ({
            ...acc,
            [grade.rank]: 0
        }), {} as Record<number, number>);

        return jmData.polls
            .reduce((acc, poll) => {
                const date = poll.field_dates[1];
                if (!date) return acc;

                const gradeRankLimits = Object.entries(poll.results)
                    .map(([candidateId, result]) => ({
                        candidateId,
                        rank: result.rank,
                        medianGrade: result.median_grade
                    }))
                    .sort((a, b) => a.rank - b.rank)
                    .reduce((gradeAcc, candidate) => {
                        gradeAcc[candidate.medianGrade] = candidate.rank;
                        return gradeAcc;
                    }, { ...gradRankLimits });

                return {
                    ...acc,
                    [date]: gradeRankLimits
                };
            }, {} as Record<string, Record<number, number>>);
    }
);

export const selectGradRankLimitsForEchart = createSelector(
    [selectJmData, selectGradRankLimits, selectPt1Dates],
    (jmData, gradRankLimits, dates): any | null => {
        if (!jmData || Object.keys(gradRankLimits).length === 0) {
            return null;
        }
        const result = jmData.poll_types.pt1.grades.map((grade) => {
            const gradeRankRange = dates.map(date => {
                return [
                    date,
                    gradRankLimits[date]?.[grade.rank - 1] ?? 0,
                    gradRankLimits[date]?.[grade.rank] ?? 0
                ] as [string, number, number]
            })
            return {
                gradeRank: grade.rank,
                name: grade.label,
                data: [
                    ...gradeRankRange.map(([date, lowLimit, _highLimit]) => [date, lowLimit + 0.58]) ,
                    ...gradeRankRange.map(([date, _lowLimit, highLimit]) => [date, highLimit + 0.42]).reverse()
                ],
            }
        });
        return result;
    }
);

export const selectCandidateRankings = createSelector(
    [selectJmData],
    (jmData): CandidateRankings | null => {
        if (!jmData) {
            return null;
        }

        const rankings = jmData.polls.reduce<CandidateRankings>((acc, poll) => {
            const date = poll.field_dates[1];
            if (!date) return acc;

            return Object.entries(poll.results).reduce((innerAcc, [candidateId, result]) => {
                const updatedRanks = [
                    ...(innerAcc[candidateId] || []),
                    { date, rank: result.rank }
                ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

                return {
                    ...innerAcc,
                    [candidateId]: updatedRanks
                };
            }, acc);
        }, {});

        return rankings;
    }
);

export const selectCandidateRankingsForECharts = createSelector(
    [selectJmData, selectCandidateRankings],
    (jmData, rankings): EChartsSeriesData[] | null => {
        if (!jmData || !rankings) {
            return null;
        }

        return Object.entries(rankings)
            .map(([candidateId, dateRanks]) => {
                const candidate = jmData.candidates[candidateId];
                if (!candidate) return null;
                const data: [string, number][] = dateRanks.map(dr => [dr.date, dr.rank]);
                return {
                    name: candidate.name,
                    data
                };
            })
            .filter((item): item is EChartsSeriesData => item !== null);
    }
);


