import type { Metadata } from "./common-survey.type";

export interface MjSurvey {
  metadata: Metadata;
  poll_types: Record<string, PollType>;
  candidates: Record<string, Candidate>;
  polls: Poll[];
}