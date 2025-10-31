import type { RootState } from '../store';
import type { CandidateRankings, EChartsSeriesData } from '../../types/survey.types';

export const selectCandidateRankings = (state: RootState): CandidateRankings | null => {
  const jmData = state.majorityJudgment.jmData;

  if (!jmData) {
    return null;
  }
  const rankings: CandidateRankings = {};

  // Parcourir tous les polls
  for (const poll of jmData.polls) {
    // Extraire la premi�re date du poll
    const date = poll.field_dates[0];

    if (!date) continue;

    // Pour chaque candidat dans les r�sultats du poll
    for (const [candidateId, result] of Object.entries(poll.results)) {
      // Initialiser le tableau pour ce candidat si n�cessaire
      if (!rankings[candidateId]) {
        rankings[candidateId] = [];
      }

      // Ajouter le DateRank
      rankings[candidateId].push({
        date,
        rank: result.rank
      });
    }
  }

  // Trier les tableaux par date pour chaque candidat
  for (const candidateId in rankings) {
    rankings[candidateId].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  return rankings;
};

export const selectCandidateRankingsForECharts = (state: RootState): EChartsSeriesData[] | null => {
  const jmData = state.majorityJudgment.jmData;
  const rankings = selectCandidateRankings(state);

  if (!jmData || !rankings) {
    return null;
  }

  const seriesData: EChartsSeriesData[] = [];

  // Transformer le Record en tableau de séries ECharts
  for (const [candidateId, dateRanks] of Object.entries(rankings)) {
    const candidate = jmData.candidates[candidateId];

    if (!candidate) continue;

    // Transformer DateRank[] en tuples [date, rank][]
    const data: [string, number][] = dateRanks.map(dr => [dr.date, dr.rank]);

    seriesData.push({
      name: candidate.name,
      data
    });
  }

  return seriesData;
};
