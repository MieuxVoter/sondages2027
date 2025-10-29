#!/usr/bin/env python3
"""
Script pour convertir un fichier Plotly JSON (ranking) vers le format ECharts.

Usage:
    python convert_ranking_plotly_to_echarts.py [input_file] [output_file]

    Par défaut:
    - input: src/data/ranking-plot-all.json
    - output: src/data/echarts_ranking.json
"""

import json
import sys
from pathlib import Path
from datetime import datetime


def extract_candidate_series(plotly_data):
    """Extrait les séries de candidats depuis les données Plotly."""
    candidates = {}
    background_areas = []

    for trace in plotly_data["data"]:
        name = trace.get("name", "")
        mode = trace.get("mode", "")
        fill = trace.get("fill", "")

        # Zones de fond (satisfaction)
        if fill == "toself":
            background_areas.append(
                {
                    "name": name,
                    "x": trace["x"],
                    "y": trace["y"],
                    "fillcolor": trace.get("fillcolor", ""),
                    "showlegend": trace.get("showlegend", False),
                }
            )
            continue

        # Séries de candidats (lignes uniquement, pas les markers)
        if mode == "lines" and name:
            if name not in candidates:
                candidates[name] = {
                    "name": name,
                    "x": trace["x"],
                    "y": trace["y"],
                    "color": trace.get("marker", {}).get("color", "#000"),
                    "type": trace.get("type", "scatter"),
                }

    return candidates, background_areas


def convert_rgba_to_echarts(rgba_string):
    """Convertit une couleur rgba(r,g,b,a) en format compatible ECharts."""
    if not rgba_string:
        return None
    # Nettoyer et extraire les valeurs
    rgba_string = rgba_string.replace("rgba(", "").replace(")", "")
    return f"rgba({rgba_string})"


def create_echarts_config(candidates, background_areas, layout):
    """Crée la configuration ECharts à partir des données Plotly."""

    # Extraire les informations du titre
    title_text = layout.get("title", {}).get("text", "")

    # Préparer les séries ECharts
    series = []

    # Ajouter les zones de fond en premier (pour qu'elles soient derrière)
    for area in background_areas:
        if area["showlegend"]:
            color = convert_rgba_to_echarts(area["fillcolor"])
            series.append(
                {
                    "name": area["name"],
                    "type": "line",
                    "data": [[x, y] for x, y in zip(area["x"], area["y"])],
                    "areaStyle": {"color": color},
                    "itemStyle": {"color": color},
                    "lineStyle": {"width": 0, "color": "transparent"},
                    "symbol": "none",
                    "smooth": False,
                    "stack": area["name"].lower().replace(" ", "-"),
                }
            )

    # Ajouter les séries de candidats
    for candidate_name, candidate_data in candidates.items():
        # Calculer le rang à la dernière position
        last_y = candidate_data["y"][-1]
        rank = int(
            round(last_y)
        )  # Le rang correspond directement à la valeur y arrondie

        # Formater le rang (1er, 2e, 3e, etc.)
        if rank == 1:
            rank_text = "1er"
        else:
            rank_text = f"{rank}e"

        series.append(
            {
                "name": candidate_name,
                "type": "line",
                "data": [
                    [x, y] for x, y in zip(candidate_data["x"], candidate_data["y"])
                ],
                "lineStyle": {"color": candidate_data["color"], "width": 2},
                "itemStyle": {"color": candidate_data["color"]},
                "showSymbol": True,
                "symbol": "circle",
                "symbolSize": 6,
                "smooth": False,
                "endLabel": {
                    "show": True,
                    "formatter": f"{rank_text} {candidate_name}",
                    "distance": 10,
                    "color": candidate_data["color"],
                },
            }
        )

    # Configuration ECharts complète
    echarts_config = {
        "title": {
            "text": "Classement des candidats à l'élection présidentielle 2027",
            "subtext": "source: IPSOS, commanditaire: La Tribune Dimanche",
            "left": "center",
            "textStyle": {"fontWeight": "bold"},
        },
        "tooltip": {
            "trigger": "item"
        },
        "legend": {
            "data": [area["name"] for area in background_areas if area["showlegend"]],
            "bottom": 0,
            "orient": "horizontal",
        },
        "grid": {
            "left": "3%",
            "right": 145,
            "bottom": 50,
            "top": 60,
            "containLabel": True,
        },
        "xAxis": {
            "type": "time",
            "boundaryGap": False,
            "axisLabel": {"formatter": "{MM}/{yyyy}"},
        },
        "yAxis": {
            "type": "value",
            "inverse": True,
            "min": 0.5,
            "max": 27,
            "interval": 1,
            "axisLabel": {"show": False},
            "splitLine": {
                "show": True,
                "lineStyle": {"color": "#e0e0e0", "type": "dashed"},
            },
        },
        "series": series,
    }

    return echarts_config


def main():
    # Déterminer les chemins de fichiers
    if len(sys.argv) > 1:
        input_file = Path(sys.argv[1])
    else:
        input_file = (
            Path(__file__).parent.parent / "src" / "data" / "ranking-plot-all.json"
        )

    if len(sys.argv) > 2:
        output_file = Path(sys.argv[2])
    else:
        output_file = (
            Path(__file__).parent.parent / "src" / "data" / "echarts_ranking.json"
        )

    print(f"Lecture du fichier: {input_file}")

    # Lire le fichier Plotly
    with open(input_file, "r", encoding="utf-8") as f:
        plotly_data = json.load(f)

    # Extraire les données
    candidates, background_areas = extract_candidate_series(plotly_data)

    print(f"Trouvé {len(candidates)} candidats")
    print(f"Trouvé {len(background_areas)} zones de satisfaction")

    # Créer la configuration ECharts
    echarts_config = create_echarts_config(
        candidates, background_areas, plotly_data.get("layout", {})
    )

    # Sauvegarder
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(echarts_config, f, ensure_ascii=False, indent=2)

    print(f"✓ Configuration ECharts créée: {output_file}")


if __name__ == "__main__":
    main()
