import type { Metadata } from "./common-survey.type";
import type { Candidate, Poll, PollType } from "./mj-survey.types";

export interface MjSurvey {
  metadata: Metadata;
  poll_types: Record<string, PollType>;
  candidates: Record<string, Candidate>;
  polls: Poll[];
}