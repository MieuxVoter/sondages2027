export interface Metadata {
  generated_at: string;
  source: string;
  voting_method: string;
  version: string;
}

export interface Candidate {
  name: string;
  party: string;
  announced: string | null;
  withdrawn: string | null;
}

export interface PollResult {
  distribution: number[];
  no_opinion: number;
  rank: number;
  median_grade: number;
  before_median: number;
  after_median: number;
  majority_tie_break: string;
}

export interface Poll {
  id: string;
  poll_type_id: string;
  field_dates: string[]
  results: Record<string, PollResult>;
}

export interface PollType {
  id: string;
  organization: string;
  num_grades: number;
  question: string;
  grades: Grade[];
}

export interface Survey {
  metadata: Metadata;
  poll_types: Record<string, PollType>;
  candidates: Record<string, Candidate>;
  polls: Poll[];
}

export interface Grade {
  rank: number;
  label: string;
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