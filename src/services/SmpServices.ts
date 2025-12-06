import type { SmpSurvey } from "../types/smp-survey.types";

export async function getLatestSmpSurveyData(): Promise<SmpSurvey> {
    const proxyUrl = 'https://corsproxy.io/?';
    const jsonUrl = 'https://github.com/MieuxVoter/mj-tracker-2027/releases/download/latest-data-v1.1/latest_survey_smp_compact.json';
    const jsonResponse = await fetch(proxyUrl + encodeURIComponent(jsonUrl));
    if (!jsonResponse.ok) {
        throw new Error(`Erreur lors du chargement des données SMP: ${jsonResponse.status}`);
    }
    return await jsonResponse.json();
}
