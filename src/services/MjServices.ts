import type { MjSurvey } from '../types/mj-survey.types';

// async function getLatestMjSurveyData() {
//   // Utiliser l'API GitHub pour récupérer la dernière release
//   const releaseResponse = await fetch(
//     'https://api.github.com/repos/MieuxVoter/mj-tracker-2027/releases/latest'
//   );
//   const release = await releaseResponse.json();

//   // Trouver le fichier dans les assets
//   const asset = release.assets.find((a: { name: string }) => a.name === 'latest_survey_mj_compact.json');

//   if (!asset) {
//     throw new Error('Fichier latest_survey_mj_compact.json non trouvé dans la release');
//   }

//   // Utiliser l'URL de l'API GitHub qui retourne directement le contenu (pas de redirection CORS)
//   const jsonResponse = await fetch(asset.url, {
//     headers: {
//       'Accept': 'application/octet-stream'
//     }
//   });

//   return await jsonResponse.json();
// }

//Note: En attendant de régler les problèmes de CORS avec l'API GitHub, on utilise un proxy public.
export async function getLatestMjSurveyData(): Promise<MjSurvey> {
  const proxyUrl = 'https://corsproxy.io/?';
  const jsonUrl = 'https://github.com/MieuxVoter/mj-tracker-2027/releases/download/latest-data/latest_survey_mj_compact.json';
  const jsonResponse = await fetch(proxyUrl + encodeURIComponent(jsonUrl));
  if (!jsonResponse.ok) {
    throw new Error(`Erreur lors du chargement des données: ${jsonResponse.status}`);
  }
  return await jsonResponse.json();
}