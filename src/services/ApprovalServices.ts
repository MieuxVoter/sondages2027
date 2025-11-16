import type { Survey } from "../types/survey.types";

export async function getLatestApprovalSurveyData(): Promise<Survey> {
  const proxyUrl = 'https://corsproxy.io/?';
  const jsonUrl = 'https://github.com/MieuxVoter/mj-tracker-2027/releases/download/latest-data/latest_survey_approval_compact.json';
  const jsonResponse = await fetch(proxyUrl + encodeURIComponent(jsonUrl));
  if (!jsonResponse.ok) {
    throw new Error(`Erreur lors du chargement des données: ${jsonResponse.status}`);
  }
  return await jsonResponse.json();
}