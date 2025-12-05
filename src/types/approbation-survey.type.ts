import type { Candidate, Metadata, PollType } from "./common.type";

export interface ApprobationSurvey {
  metadata: Metadata;
  poll_types: Record<string, PollType>;
  candidates: Record<string, Candidate>;
  polls: ApprobationPoll[];
}

export interface ApprobationPoll {
  id: string;
  poll_type_id: string;
  field_dates: string[]
  results: Record<string, ApprobationPollResult>;
}

export interface ApprobationPollResult {
  approval: number;
  rank: number;
}