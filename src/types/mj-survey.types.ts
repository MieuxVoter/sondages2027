import type { Candidate, Metadata, PollType } from "./common.type";

export interface MjSurvey {
  metadata: Metadata;
  poll_types: Record<string, PollType>;
  candidates: Record<string, Candidate>;
  polls: MjPoll[];
}

export interface MjPollResult {
  distribution: number[];
  no_opinion: number;
  rank: number;
  median_grade: number;
  before_median: number;
  after_median: number;
  majority_tie_break: string;
}

export interface MjPoll {
  id: string;
  poll_type_id: string;
  field_dates: string[]
  results: Record<string, MjPollResult>;
}

export interface DateRank {
  date: string;
  rank: number;
}

export type CandidateRankings = Record<string, DateRank[]>;

export interface EChartsSeriesData {
  name: string;
  data: [string, number][];
}