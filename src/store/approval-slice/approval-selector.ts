import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

const selectApprovalData = (state: RootState) => state.approval.survey;

export const selectApprovalDates = createSelector(
    [selectApprovalData],
    (approvalData): Array<{ date: string; index: number }> => {
        if (!approvalData) {
            return [];
        }

        return approvalData.polls
            .filter(poll => poll.poll_type_id === 'pt1')
            .map(poll => poll.field_dates[1])
            .filter((date): date is string => date !== undefined)
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
            .map((date, index) => ({ date, index }));
    }
);

export const selectLastApprovalDate = createSelector(
    [selectApprovalDates],
    (dates): string | null => {
        if (dates.length === 0) {
            return null;
        }
        return dates[0].date;
    }
);

interface DateRank {
    date: string;
    rank: number;
}

type CandidateApprovalRankings = Record<string, DateRank[]>;

export const selectCandidateApprovalRankings = createSelector(
    [selectApprovalData],
    (approvalData): CandidateApprovalRankings | null => {
        if (!approvalData) {
            return null;
        }

        const rankings = approvalData.polls.reduce<CandidateApprovalRankings>((acc, poll) => {
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

interface EChartsSeriesData {
    name: string;
    data: [string, number][];
}

export const selectCandidateApprovalRankingsForECharts = createSelector(
    [selectApprovalData, selectCandidateApprovalRankings],
    (approvalData, rankings): EChartsSeriesData[] | null => {
        if (!approvalData || !rankings) {
            return null;
        }

        return Object.entries(rankings)
            .map(([candidateId, dateRanks]) => {
                const candidate = approvalData.candidates[candidateId];
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

export const selectLastApprovalPoll = createSelector(
    [selectApprovalData],
    (approvalData) => {
        if (!approvalData || approvalData.polls.length === 0) {
            return null;
        }
        return approvalData.polls[0];
    }
);

export const selectCandidateOrderedByLatestApprovalRank = createSelector(
    [selectApprovalData, selectLastApprovalPoll],
    (approvalData, lastPoll) => {
        if (!approvalData || !lastPoll) {
            return [];
        }
        const result = Object.entries(approvalData.candidates).map(([candidateId, candidate]) => ({
            candidateId,
            name: candidate.name,
        }))
            .map(({ candidateId, name }) => {
                return {
                    candidateId,
                    name,
                    rank: lastPoll.results[candidateId]?.rank ?? 999,
                    approval: lastPoll.results[candidateId]?.approval ?? 0
                };
            })
            .sort((a, b) => a.rank - b.rank);
        return result;
    }
);

export const selectCandidateApprovalByPollIndex = createSelector(
    [selectApprovalData, (_state: RootState, pollIndex: number) => pollIndex],
    (approvalData, pollIndex) => {
        const pollResult = approvalData?.polls[pollIndex]?.results;
        if (!approvalData || !pollResult) {
            return [];
        }

        return Object.entries(pollResult)
            .map(([candidateId, result]) => {
                const candidate = approvalData.candidates[candidateId];
                if (!candidate) return null;
                return {
                    key: candidateId,
                    name: candidate.name,
                    approval: result.approval,
                    rank: result.rank
                };
            })
            .filter((item): item is { key: string; name: string; approval: number; rank: number } => item !== null)
            .sort((a, b) => a.rank - b.rank);
    }
);
