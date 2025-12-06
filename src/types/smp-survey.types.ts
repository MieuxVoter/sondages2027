// Types for SMP (Scrutin Majoritaire Plurinominal) / Uninominal survey data

export interface SmpIntentionsMoy14d {
    end_date: string[];
    valeur: number[];
    std: number[];
    erreur_inf: number[];
    erreur_sup: number[];
}

export interface SmpIntentions {
    fin_enquete: string[];
    valeur: number[];
    commanditaire: string[];
    institut: string[];
}

export interface SmpCandidate {
    couleur: string;
    intentions_moy_14d: SmpIntentionsMoy14d;
    intentions: SmpIntentions;
}

export interface SmpSurvey {
    dernier_sondage: string;
    mise_a_jour: string;
    candidats: Record<string, SmpCandidate>;
}
