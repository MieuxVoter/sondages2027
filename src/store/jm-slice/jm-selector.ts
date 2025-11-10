import { createSelector } from '@reduxjs/toolkit';
import type { CandidateRankings, EChartsSeriesData } from '../../types/survey.types';
import type { RootState } from '../store';

const selectJmData = (state: RootState) => state.majorityJudgment.jmData ;

export const selectPt1Dates = createSelector(
    [selectJmData], 
    (jmData): Array<{ date: string; index: number }> => {
        if (!jmData) {
            return [];
        }

        return jmData.polls
            .filter(poll => poll.poll_type_id === 'pt1')
            .map(poll => poll.field_dates[1])
            .filter((date): date is string => date !== undefined)
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
            .map((date, index) => ({ date, index }));
    }
);

export const selectPt1DatesForCandidate = createSelector(
    [selectJmData, (_state: RootState, candidateId: string) => candidateId],
    (jmData, candidateId): Array<{ date: string; index: number }> => {
        if (!jmData) {
            return [];
        }

        return jmData.polls
            .filter(poll => poll.poll_type_id === 'pt1')
            .filter(poll => !candidateId || !!poll.results[candidateId])
            .map(poll => poll.field_dates[1])
            .filter((date): date is string => date !== undefined)
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
            .map((date, index) => ({ date, index }));
    }
);

export const selectLastPt1Date = createSelector(
    [selectPt1Dates],
    (dates): string | null => {
        if (dates.length === 0) {
            return null;
        }
        return dates[0].date;
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
            const gradeRankRange = dates.map(dateObj => {
                return [
                    dateObj.date,
                    gradRankLimits[dateObj.date]?.[grade.rank - 1] ?? 0,
                    gradRankLimits[dateObj.date]?.[grade.rank] ?? 0
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

export const selectCandidateDistributionByPollIndex = createSelector(
    [selectJmData, (_state: RootState, pollIndex: number) => pollIndex],
    (jmData, pollIndex) => {
        const pollResult = jmData?.polls[pollIndex].results;
        if (!jmData || !pollResult) {
            return [];
        }

        return Object.entries(pollResult)
            .map(([candidateId, result]) => {
                const candidate = jmData.candidates[candidateId];
                if (!candidate) return null;
                return {
                    key: candidateId,
                    name: candidate.name,
                    distribution: result.distribution,
                    rank: result.rank
                };
            })
            .filter((item): item is { key: string; name: string; distribution: number[]; rank: number } => item !== null)
            .sort((a, b) => a.rank - b.rank);
    }
);

export const selectMeritChartSeriesByPollIndexForECharts = createSelector(
    [selectCandidateDistributionByPollIndex, selectJmData],
    (candidateDistributions, jmData) => {
        if (!jmData || candidateDistributions.length === 0) {
            return [];
        }

        const grades = jmData.poll_types.pt1.grades;

        return grades.map((grade) => ({
            name: grade.label,
            data: candidateDistributions.map(candidate => candidate.distribution[grade.rank - 1])
        }));
    }
);

export const selectTimeMeritChartSeriesByCandidateIdForECharts = createSelector(
    [selectJmData, (_state: RootState, candidateId: string) => candidateId],
    (jmData, candidateId) => {
        if (!jmData) {
            return [];
        }
        const grades = jmData.poll_types.pt1.grades;
        const sortedPolls = [...jmData.polls]
            .filter(poll => !candidateId || !!poll.results[candidateId])
            .reverse();
        return grades.map(grade => ({
            name: grade.label,
            data: sortedPolls.map(poll => {
                if(!poll.results[candidateId]){
                    console.log(poll.field_dates[1])
                }
                const distribution = poll.results[candidateId].distribution;
                return distribution[grade.rank - 1];
            })
        }));
    }
);

export const selectLastPool = createSelector(
    [selectJmData],
    (jmData) => {
        if (!jmData || jmData.polls.length === 0) {
            return null;
        }
        return jmData.polls[0];
    }
)
 
export const selectCandidateOrderedByLatestRank = createSelector(
    [selectJmData, selectLastPool],
    (jmData, lastPool) => {
        if(!jmData || !lastPool) {
            return [];
        }
        const result = Object.entries(jmData.candidates).map(([candidateId, candidate]) => ({
            candidateId,
            name: candidate.name,
        }))
        .map(({ candidateId, name }) => {
            return { candidateId, name, rank: lastPool.results[candidateId].rank };
        })
        .sort((a, b) => a.rank - b.rank);
        return result;
    }
)

export const selectCandidateInfo = createSelector(
    [selectJmData, (_state: RootState, candidateId: string) => candidateId], (jmData, candidateId) => {
        if(!jmData){null}
        return jmData?.candidates[candidateId];
    }
)
        
