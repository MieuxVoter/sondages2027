import type { Metadata } from "./common-survey.type";
import type { Candidate, PollType } from "./mj-survey.types";

// Approbation-specific poll result with approval field
export interface ApprobationPollResult {
  distribution: number[];
  no_opinion: number;
  rank: number;
  approval: number;  // Direct approval percentage
  median_grade: number;
  before_median: number;
  after_median: number;
  majority_tie_break: string;
}

export interface ApprobationPoll {
  id: string;
  poll_type_id: string;
  field_dates: string[];
  results: Record<string, ApprobationPollResult>;
}

export interface ApprobationSurvey {
  metadata: Metadata;
  poll_types: Record<string, PollType>;
  candidates: Record<string, Candidate>;
  polls: ApprobationPoll[];
}