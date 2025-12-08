import type { SmpSurvey } from "../types/smp-survey.types";

export async function getLatestSmpSurveyData(): Promise<SmpSurvey> {
    const proxyUrl = 'https://corsproxy.io/?';
    const jsonUrl = 'https://github.com/MieuxVoter/mj-tracker-2027/releases/download/latest-data-v1.1/latest_survey_smp_compact.json';
    const cacheBuster = `?t=${Date.now()}`;
    const jsonResponse = await fetch(proxyUrl + encodeURIComponent(jsonUrl + cacheBuster));
    if (!jsonResponse.ok) {
        throw new Error(`Erreur lors du chargement des données SMP: ${jsonResponse.status}`);
    }
    const text = await jsonResponse.text();
    // Replace NaN with null to make it valid JSON (handles NaN in arrays too)
    const safeText = text.replace(/\bNaN\b/g, 'null');
    return JSON.parse(safeText);
}
