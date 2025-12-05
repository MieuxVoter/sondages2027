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

export interface PollType {
  id: string;
  organization: string;
  num_grades: number;
  question: string;
  grades: Grade[];
}

export interface Grade {
  rank: number;
  label: string;
}

