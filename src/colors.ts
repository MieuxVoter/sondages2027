import { alpha } from '@mui/material/styles';

export const themeColor = {
    primary: "#003d8a",
    secondary: "#f50057"
} as const

const fiveGradeScaleBase = [
    "rgb(160, 207, 28)",
    "rgb(211, 215, 21)",
    "rgb(194, 177, 19)",
    "rgb(194, 124, 19)",
    "rgb(194, 61, 19)"
];

const candidateColor: Record<string, string> = {
    "Bernard Cazeneuve": "#b339a4",
    "Bruno Le Maire": "#0095eb",
    "Bruno Retailleau": "#0242e3",
    "Clémentine Autain": "#de001e",
    "David Lisnard": "#0242e3",
    "Dominique de Villepin": "#0242e3",
    "Edouard Philippe": "#0095eb",
    "Eric Ciotti": "#0242e3",
    "Eric Zemmour": "#010038",
    "Fabien Roussel": "#940014",
    "François Bayrou": "#f28f2d",
    "François Hollande": "#b339a4",
    "François Ruffin": "#de001e",
    "Gabriel Attal": "#0095eb",
    "Gérald Darmanin": "#0095eb",
    "Jean Castex": "black",
    "Jean-Luc Mélenchon": "#de001e",
    "Jordan Bardella": "#04006e",
    "Laurent Wauquiez": "#0242e3",
    "Marine Le Pen": "#04006e",
    "Marine Tondelier": "#0bb029",
    "Marion Maréchal": "#010038",
    "Michel Barnier": "black",
    "Olivier Faure": "#b339a4",
    "Raphaël Glucksmann": "#b339a4",
    "Xavier Bertrand": "#0242e3",
    "Yaël Braun-Pivet": "#0095eb"
}

export const graphColor = {
    fiveGradeScale: fiveGradeScaleBase,
    rankingFiveGradeScale: fiveGradeScaleBase.map(color => alpha(color, 0.2)),
    candidateColor : candidateColor
}




